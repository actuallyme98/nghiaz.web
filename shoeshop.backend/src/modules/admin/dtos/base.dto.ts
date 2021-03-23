import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from '@api/entities/base-model.entity';

export class BaseDTO {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  constructor(entity: BaseModel) {
    this.createdAt = entity.createdAt.toISOString();
    this.updatedAt = entity.updatedAt.toISOString();
  }
}
