import { Module } from '@nestjs/common';
import { ProvinciaController } from './provincia.controller';
import { ProvinciaService } from './provincia.service';

@Module({
  controllers: [ProvinciaController],
  providers: [ProvinciaService]
})
export class ProvinciaModule {}
