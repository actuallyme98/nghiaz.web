import {
  BaseEntity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseDTO } from '@api/dtos/base.dto';

export abstract class BaseModel<DTO extends BaseDTO = BaseDTO, DTOOption = any> extends BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'char',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'char',
  })
  updatedAt: string;

  dtoClass?: new (entity: BaseModel, options?: any) => DTO;

  toDto(options?: DTOOption): DTO {
    return new this.dtoClass(this, options);
  }
}
