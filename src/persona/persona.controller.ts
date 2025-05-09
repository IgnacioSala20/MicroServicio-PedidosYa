import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaEntity } from '@/entities/persona.entity';

@Controller('person')
export class PersonaController {
    constructor(private readonly personaService: PersonaService){}

    @Post()
    crearPersona(@Body() datosPersona: PersonaEntity){
        return this.personaService.create(datosPersona)
    }
    @Get()
    obtenerPersonas(){
        return this.personaService.find()
    }
    @Get(':id')
    obtenerPersonaId(@Param("id") id:number){
        return this.personaService.findOne({where: {id:Number(id)}})
    }

    @Put(":id")
    actualizacionTotal(@Param("id") id:number, @Body() datosParciales: PersonaEntity){
        return this.personaService.update(id, datosParciales)
    }

    @Patch(":id")
    actualizacionParcial(@Param("id") id:number, @Body() datosParciales: Partial<PersonaEntity>){
        return this.personaService.update(id, datosParciales)
    }

    @Delete(":id")
    eliminar(@Param("id") id:number){
        return this.personaService.delete(id)
    }

}
