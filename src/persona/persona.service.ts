import { BaseService } from '@/base-service/base-service.service';
import { PersonaEntity } from '@/entities/persona.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class PersonaService extends BaseService<PersonaEntity> {
    findManyOptions: FindManyOptions<PersonaEntity> = {
        relations: ['ciudades', 'ciudades.provincias', 'ciudades.provincias.paises'],
    };
    findOneOptions: FindManyOptions<PersonaEntity> = {
        relations: ['ciudades', 'ciudades.provincias', 'ciudades.provincias.paises'],
    };
    constructor(
        @InjectRepository(PersonaEntity) 
        protected personaRepository:Repository<PersonaEntity>,
    ){
        super(personaRepository);
    }

}
