import { Controller, Get, Post,Patch,Delete, Put,Body,Param } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadEntity } from '@/entities/ciudad.entity';

@Controller('city')
export class CiudadController {
    constructor(private readonly ciudadService:CiudadService){}
    
    @Post()
    crearCiudad(@Body() datosCiudad: CiudadEntity){
        return this.ciudadService.crear(datosCiudad)
    }

    @Get()
    obtenerCiudades(){
        return this.ciudadService.getCiudades()
    }

    @Get(":id")
    obtenerCiudadPorId(@Param("id") id:number){
        return this.ciudadService.getCiudadPorId(id)
    }

    @Put(":id")
    actualizacionTotal(@Param("id") id:number, @Body() datosTotales:CiudadEntity){
        return this.ciudadService.actualizacionTotal(id, datosTotales)
    }

    @Patch(":id")
    actualizacionParcial(@Param(":id") id:number, @Body() datosParciales: Partial<CiudadEntity>){
        return this.ciudadService.actualizacionParcial(id, datosParciales)
    }

    @Delete(":id")
    eliminarCiudad(@Param("id") id:number){
        return this.ciudadService.eliminarCiudad(id)
    }

    @Patch(":id/recuperar")
    recuperarCiudad(@Param("id") id:number){
        return this.ciudadService.restautarCiudad(id)
    }
}
