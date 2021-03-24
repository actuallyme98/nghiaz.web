import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from '@api/entities/base-model.entity';

export class BaseDTO {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(entity: BaseModel) {
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
