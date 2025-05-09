import { BaseService } from '@/base-service/base-service.service';
import { PaisEntity } from '@/entities/pais.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class PaisService extends BaseService<PaisEntity> {
    findManyOptions: FindManyOptions<PaisEntity> = {};
    findOneOptions: FindOneOptions<PaisEntity> = {};
    constructor(
        @InjectRepository(PaisEntity)
        protected repository: Repository<PaisEntity>,
    ) {
        super(repository);
    }
}
