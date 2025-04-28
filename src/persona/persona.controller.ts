import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaEntity } from '@/entities/persona.entity';

@Controller('persona')
export class PersonaController {
    constructor(private readonly personaService: PersonaService){}

    @Post()
    crearPersona(@Body() datosPersona: PersonaEntity){
        return this.personaService
    }
    @Get()
    obtenerPersonas(){
        return this.personaService
    }

    @Get(':id')
    obtenerPersonaId(@Param("id") id:number){
        return this.personaService
    }

    @Put(":id")
    actualizacionTotal(@Param("id") id:number){
        return this.personaService
    }

    @Patch(":id")
    actualizacionParcial(@Param("id") id:number, @Body() datosParciales: Partial<PersonaEntity>){
        return this.personaService
    }

    @Delete(":id")
    eliminar(@Param("id") id:number){
        return this.personaService
    }
    @Patch(":id/recuperar")
    recuperarPersona(@Param("id") id:number){
        return this.personaService
    }


}
