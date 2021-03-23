import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { BaseModel } from './base-model.entity';

export enum MailStatusType {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export enum MailType {
  VERIFY_USER = 'verify-user',
  FORGOT_PASSWORD = 'forgot-password',
}

@Entity('mail')
export class Mail extends BaseModel {
  constructor(partial: Partial<Mail>) {
    super();
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: MailStatusType,
    default: MailStatusType.PENDING,
  })
  status: MailStatusType;

  @Column({
    type: 'enum',
    enum: MailType,
  })
  type: MailType;

  @Column({
    type: 'varchar',
    name: 'send_from',
    length: 255,
    nullable: false,
  })
  sendFrom: string;

  @Column({
    type: 'varchar',
    name: 'send_to',
    length: 255,
    nullable: false,
  })
  sendTo: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  subject: string;

  @Column({
    type: 'varchar',
    name: 'content',
    length: 1000,
    nullable: false,
  })
  content: string;

  @Column({
    type: 'int',
    default: 3,
    nullable: false,
  })
  retry: number;
}
