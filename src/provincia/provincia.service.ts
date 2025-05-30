import { BaseService } from '@/base-service/base-service.service';
import { ProvinciaEntity } from '@/entities/provincia.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProvinciaService extends BaseService<ProvinciaEntity> {
    findManyOptions: FindManyOptions<ProvinciaEntity> = {};
    findOneOptions: FindOneOptions<ProvinciaEntity> = {
        relations: ['pais'],
    };
    constructor(
        @InjectRepository(ProvinciaEntity) 
        protected provinciaRepository:Repository<ProvinciaEntity>,
    ){
        super(provinciaRepository);
    }

    async pruebas(){
        return this.provinciaRepository.find()
    }

    
}
