import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mail } from '@api/entities';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as pug from 'pug';
import { join } from 'path';
import { Cron } from '@nestjs/schedule';
import { MailStatusType, MailType } from '../entities/mail.entity';
import { MailerService } from '@nestjs-modules/mailer';

export interface CreateEmailInput {
  sendFrom?: string;
  sendTo: string;
  subject: string;
  content: string;
  retry?: number;
  type: MailType;
}

export interface CreateVerifyEmailInput {
  sendTo: string;
  data: {
    link: string;
  };
}

export interface CreateForgotPasswordInput {
  sendTo: string;
  data: {
    link: string;
  };
}

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private readonly mailRepository: Repository<Mail>,
    private configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async insertMail(payload: CreateEmailInput) {
    payload.sendFrom = payload.sendFrom || this.configService.get('EMAIL_SEND_FROM');
    return this.mailRepository.create(payload).save();
  }

  async insertVerifyEmail(payload: CreateVerifyEmailInput) {
    const html = pug.renderFile(join(__dirname, '../../../../templates/emails/verify-user.pug'), {
      link: payload.data.link,
    });
    this.insertMail({
      sendFrom: this.configService.get('EMAIL_SEND_FROM'),
      sendTo: payload.sendTo,
      subject: 'Verify Email',
      content: html,
      type: MailType.VERIFY_USER,
      retry: 3,
    });
  }

  async insertForgotPasswordEmail(payload: CreateForgotPasswordInput) {
    const html = pug.renderFile(
      join(__dirname, '../../../../templates/emails/forgot-password.pug'),
      {
        link: payload.data.link,
      },
    );
    this.insertMail({
      sendFrom: this.configService.get('EMAIL_SEND_FROM'),
      sendTo: payload.sendTo,
      subject: 'Verify Forgot Password',
      content: html,
      type: MailType.FORGOT_PASSWORD,
      retry: 3,
    });
  }

  // Call every 30 seconds
  @Cron('30 * * * * *')
  private async sendMailVerifyUserBatch() {
    const mails = await this.mailRepository.find({
      where: {
        status: MailStatusType.PENDING,
        type: MailType.VERIFY_USER,
      },
    });
    for (const mail of mails) {
      try {
        await this.mailerService.sendMail({
          from: mail.sendFrom,
          to: mail.sendTo,
          subject: mail.subject,
          html: mail.content,
        });
        mail.status = MailStatusType.SUCCESS;
      } catch (e) {
        if (mail.retry > 0) {
          mail.retry -= 1;
        } else {
          mail.status = MailStatusType.FAIL;
        }
      }
      await mail.save();
    }
  }

  // Call every 30 seconds
  @Cron('30 * * * * *')
  private async sendMailForgotPasswordBatch() {
    const mails = await this.mailRepository.find({
      where: {
        status: MailStatusType.PENDING,
        type: MailType.FORGOT_PASSWORD,
      },
    });
    for (const mail of mails) {
      try {
        await this.mailerService.sendMail({
          from: mail.sendFrom,
          to: mail.sendTo,
          subject: mail.subject,
          html: mail.content,
        });
        mail.status = MailStatusType.SUCCESS;
      } catch (e) {
        if (mail.retry > 0) {
          mail.retry -= 1;
        } else {
          mail.status = MailStatusType.FAIL;
        }
      }
      await mail.save();
    }
  }
}
