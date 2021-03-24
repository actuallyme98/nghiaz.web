import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Color, Size, Category } from '@api/entities';
import { TokenHelper, ErrorHelper, EncryptHelper } from '@base/helpers';
import { AdminService } from '@admin/services';
import { ConfigService } from '@nestjs/config';
import { APIRequest } from '@api/interfaces';
import { classToPlain } from 'class-transformer';

import { CreateColorDTO, CreateSizeDTO, UpdateColorDTO, UpdateSizeDTO } from '@admin/dtos';

@Injectable()
export class ProductCSC {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // list
  async listSizes() {
    return await this.sizeRepository.find();
  }
  async listColors() {
    return await this.colorRepository.find();
  }
  async listCategories() {
    return await this.categoryRepository.find();
  }
  // insert
  async createSize(args: CreateSizeDTO) {
    const newSize = new Size(args);
    await newSize.save();
  }
  async createColor(args: CreateColorDTO) {
    const newColor = new Color(args);
    await newColor.save();
  }
  // update
  async updateSize(args: UpdateSizeDTO) {
    const size = await this.sizeRepository.findOne(args.id);
    if (!size) {
      throw ErrorHelper.BadRequestException('Not found');
    }
    Object.assign(size, args);
    await size.save();
  }
  async updateColor(args: UpdateColorDTO) {
    const color = await this.colorRepository.findOne(args.id);
    if (!color) {
      throw ErrorHelper.BadRequestException('Not found');
    }
    Object.assign(color, args);
    await color.save();
  }
  // delete
  async deleteSize(id: number) {
    await this.sizeRepository.delete(id);
  }
  async deleteColor(id: number) {
    await this.colorRepository.delete(id);
  }
}
