import { CiudadEntity } from '@/entities/ciudad.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CiudadService {
    constructor(@InjectRepository(CiudadService) private ciudadRepository: Repository<CiudadEntity>){}

    
}
