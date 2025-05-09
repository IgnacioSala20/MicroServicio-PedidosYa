import { Controller, Get, Post,Patch,Delete, Put,Body,Param } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadEntity } from '@/entities/ciudad.entity';

@Controller('city')
export class CiudadController {
    constructor(private readonly ciudadService:CiudadService){}
    
    @Post()
    crearCiudad(@Body() datosCiudad: CiudadEntity){
        return this.ciudadService.create(datosCiudad)
    }

    @Get()
    obtenerCiudades(){
        return this.ciudadService.find()
    }

    @Get(":id")
    obtenerCiudadPorId(@Param("id") id:number){
        return this.ciudadService.findOne({where:{id: Number(id)}})
    }

    @Put(":id")
    actualizacionTotal(@Param("id") id:number, @Body() datosTotales:CiudadEntity){
        return this.ciudadService.update(id, datosTotales)
    }

    @Patch(":id")
    actualizacionParcial(@Param(":id") id:number, @Body() datosParciales: Partial<CiudadEntity>){
        return this.ciudadService.update(id, datosParciales)
    }

    @Delete(":id")
    eliminarCiudad(@Param("id") id:number){
        return this.ciudadService.delete(id)
    }
}
