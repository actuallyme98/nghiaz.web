import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [],
  exports: [],
})
export class SharedModule {}
