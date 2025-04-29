import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaEntity } from '@/entities/persona.entity';

@Controller('person')
export class PersonaController {
    constructor(private readonly personaService: PersonaService){}

    @Post()
    crearPersona(@Body() datosPersona: PersonaEntity){
        return this.personaService.crear(datosPersona)
    }
    @Get()
    obtenerPersonas(){
        return this.personaService.getPersonas()
    }

    @Get(':id')
    obtenerPersonaId(@Param("id") id:number){
        return this.personaService.getPersonaPorId(id)
    }

    @Put(":id")
    actualizacionTotal(@Param("id") id:number, @Body() datosParciales: PersonaEntity){
        return this.personaService.actualizacionTotal(id, datosParciales)
    }

    @Patch(":id")
    actualizacionParcial(@Param("id") id:number, @Body() datosParciales: Partial<PersonaEntity>){
        return this.personaService.actualizacionParcial(id, datosParciales)
    }

    @Delete(":id")
    eliminar(@Param("id") id:number){
        return this.personaService.eliminarPersona(id)
    }
    @Patch(":id/recuperar")
    recuperarPersona(@Param("id") id:number){
        return this.personaService.restaurarPersona(id)
    }


}
