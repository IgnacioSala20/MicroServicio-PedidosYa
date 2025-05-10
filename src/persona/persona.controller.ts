import { Controller } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaEntity } from '@/entities/persona.entity';
import { BaseController } from '@/base-service/base-controller.controller';

@Controller('person')
export class PersonaController extends BaseController<PersonaEntity> {
    constructor(protected readonly personaService: PersonaService){
        super(personaService);
    }
}
