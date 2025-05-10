import { Controller } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ProvinciaEntity } from '@/entities/provincia.entity';
import { BaseController } from '@/base-service/base-controller.controller';

@Controller('province')
export class ProvinciaController extends BaseController<ProvinciaEntity> {
    constructor(protected readonly provinciaService: ProvinciaService){
        super(provinciaService);
    }

}
