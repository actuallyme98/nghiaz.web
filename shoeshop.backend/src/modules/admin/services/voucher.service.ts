import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Voucher, VoucherCode } from '@api/entities';
import { CreateVoucherDTO, UpdateVoucherDTO, UpdateVoucherCodeDTO } from '@admin/dtos';

import { ErrorHelper, StringHelper } from '@base/helpers';

@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherRepository: Repository<Voucher>,
    @InjectRepository(VoucherCode)
    private readonly voucherCodeRepository: Repository<VoucherCode>,
  ) {}

  async listVoucher() {
    return await this.voucherRepository
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.voucherCodes', 'voucher_code')
      .getMany();
  }

  async createVoucher(args: CreateVoucherDTO) {
    const voucher = await this.voucherRepository.findOne({
      where: {
        title: args.title,
      },
    });
    if (voucher) {
      throw ErrorHelper.BadRequestException('Mã đã tồn tại');
    }
    const arrCodes = Array.from({ length: args.quantity }, () => StringHelper.randomString(6));
    const voucherCodes = await Promise.all(
      arrCodes.map(
        async (code) =>
          await new VoucherCode({
            code,
            isUsed: 0,
          }).save(),
      ),
    );
    const newVoucher = new Voucher({
      ...args,
      voucherCodes,
    });
    return await newVoucher.save();
  }

  async updateVoucher(args: UpdateVoucherDTO) {
    const voucher = await this.voucherRepository.findOne(args.id);
    if (!voucher) {
      throw ErrorHelper.BadRequestException('Not found');
    }
    Object.assign(voucher, args);
    return await voucher.save();
  }

  async deleteVoucher(id: number) {
    const codes = await this.voucherCodeRepository
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.voucher', 'voucher')
      .andWhere('voucher.id = :id', { id })
      .getMany();
    await this.voucherCodeRepository.remove(codes);
    return await this.voucherRepository.delete(id);
  }

  async updateVoucherCode(args: UpdateVoucherCodeDTO) {
    const code = await this.voucherCodeRepository.findOne(args.id);
    if (!code) {
      throw ErrorHelper.BadRequestException('Not found');
    }
    Object.assign(code, args);
    return await code.save();
  }

  async deleteVoucherCode(id: number) {
    return await this.voucherCodeRepository.delete(id);
  }
}
