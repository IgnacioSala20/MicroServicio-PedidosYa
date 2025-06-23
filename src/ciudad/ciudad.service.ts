import { BaseService } from '@/base-service/base-service.service';
import { CiudadEntity } from '@/entities/ciudad.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CiudadService extends BaseService<CiudadEntity> {
    findManyOptions: FindManyOptions<CiudadEntity> = {
        relations: ['provincias', 'provincias.paises'],
    };
    findOneOptions: FindOneOptions<CiudadEntity> = {
        relations: ['provincias', 'provincias.paises'],
    };
    constructor(
        @InjectRepository(CiudadEntity) 
        protected ciudadRepository: Repository<CiudadEntity>,
    ){
        super(ciudadRepository);
    }

}
