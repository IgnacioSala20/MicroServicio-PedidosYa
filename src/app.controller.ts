import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PersonaEntity } from './entities/persona.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<PersonaEntity[]> {
    return await this.appService.find();
  }
}
