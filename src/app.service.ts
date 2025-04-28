import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonaEntity } from './entities/persona.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(PersonaEntity) private repository: Repository<PersonaEntity>) { }
  
  async find():Promise<PersonaEntity[]> {
    return await this.repository.find();
  }
}