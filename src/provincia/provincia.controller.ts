import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ProvinciaEntity } from '@/entities/provincia.entity';
import { BaseController } from '@/base-service/base-controller.controller';
import { AuthGuard } from '@/middlewares/auth.middleware';
import { PermissionController, Permissions } from '@/middlewares/decorators/permissions.decorator';
//import { PermissionController } from '@/middlewares/decorators/permissions.decorator';

@UseGuards(AuthGuard)
@Permissions(['Ver reportes', 'crear usuario'])
@PermissionController('provincia')
@Controller('province')
export class ProvinciaController extends BaseController<ProvinciaEntity> {
    constructor(protected readonly provinciaService: ProvinciaService){
        super(provinciaService);
    }
}
