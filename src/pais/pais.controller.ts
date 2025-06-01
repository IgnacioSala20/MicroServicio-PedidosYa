import { Controller, UseGuards } from '@nestjs/common';
import { PaisService } from './pais.service';
import { PaisEntity } from '@/entities/pais.entity';
import { BaseController } from '@/base-service/base-controller.controller';
import { AuthGuard } from '@/middlewares/auth.middleware';
import { PermissionController } from '@/middlewares/decorators/permissions.decorator';


@UseGuards(AuthGuard)
@PermissionController('pais')
@Controller('country')
export class PaisController extends BaseController<PaisEntity> {
    constructor(protected readonly paisService: PaisService){
        super(paisService);
    }
}
