import { Controller, UseGuards } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaEntity } from '@/entities/persona.entity';
import { BaseController } from '@/base-service/base-controller.controller';
import { AuthGuard } from '@/middlewares/auth.middleware';
import { PermissionController, Permissions } from '@/middlewares/decorators/permissions.decorator';

@UseGuards(AuthGuard)
@Permissions(['Ver reportes', 'crear usuario'])
@PermissionController('persona')
@Controller('person')
export class PersonaController extends BaseController<PersonaEntity> {
    constructor(protected readonly personaService: PersonaService){
        super(personaService);
    }
}