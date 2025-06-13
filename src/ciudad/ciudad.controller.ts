import { Controller, UseGuards } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadEntity } from '@/entities/ciudad.entity';
import { BaseController } from '@/base-service/base-controller.controller';
import { AuthGuard } from '@/middlewares/auth.middleware';
import { PermissionController } from '@/middlewares/decorators/permissions.decorator';

@UseGuards(AuthGuard)
@PermissionController('ciudad')
@Controller('city')
export class CiudadController extends BaseController<CiudadEntity> {
    constructor(protected readonly ciudadService:CiudadService){
        super(ciudadService);
    }
}
