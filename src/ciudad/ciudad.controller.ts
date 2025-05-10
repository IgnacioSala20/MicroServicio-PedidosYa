import { Controller } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadEntity } from '@/entities/ciudad.entity';
import { BaseController } from '@/base-service/base-controller.controller';

@Controller('city')
export class CiudadController extends BaseController<CiudadEntity> {
    constructor(protected readonly ciudadService:CiudadService){
        super(ciudadService);
    }
    
}
