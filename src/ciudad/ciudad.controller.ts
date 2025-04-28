import { Controller, Get, Post,Patch,Delete, Put,Body,Param } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadEntity } from '@/entities/ciudad.entity';

@Controller('ciudad')
export class CiudadController {
    constructor(private readonly ciudadService:CiudadService){}
    
    @Post()
    crearCiudad(@Body() datosCiudad: CiudadEntity){
        return this.ciudadService
    }

    @Get()
    obtenerCiudades(){
        return this.ciudadService
    }

    @Get(":id")
    obtenerCiudadPorId(@Param("id") id:number){
        return this.ciudadService
    }

    @Put(":id")
    actualizacionTotal(@Param("id") id:number, @Body() datosTotales:CiudadEntity){
        return this.ciudadService
    }

    @Patch(":id")
    actualizacionParcial(@Param(":id") id:number, @Body() datosParciales: Partial<CiudadEntity>){
        return this.ciudadService
    }

    @Delete(":id")
    eliminarCiudad(@Param("id") id:number){
        return this.ciudadService
    }

    @Patch(":id/recuperar")
    recuperarCiudad(@Param("id") id:number){
        this.ciudadService
    }


}
