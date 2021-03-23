import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseDTO } from '@api/dtos/base.dto';

export abstract class BaseModel<DTO extends BaseDTO = BaseDTO, DTOOption = any> extends BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
  })
  updatedAt: Date;

  dtoClass?: new (entity: BaseModel, options?: any) => DTO;

  toDto(options?: DTOOption): DTO {
    return new this.dtoClass(this, options);
  }
}
