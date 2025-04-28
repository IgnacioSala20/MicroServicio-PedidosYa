import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ProvinciaEntity } from '@/entities/provincia.entity';

@Controller('provincia')
export class ProvinciaController {
    constructor(private readonly provinciaService: ProvinciaService){}

    @Post()
    crearProvincia(@Body() datosProvincia:ProvinciaEntity){
        return this.provinciaService
    }

    @Get()
    obtenerProvincias(){
        return this.provinciaService
    }

    @Get(":id")
    obtenerProvinciasPorId(@Param("id") id:number){
        return this.provinciaService
    }

    @Put(":id")
    actualizacionTotal(@Param("id") id:number, @Body() datosTotal: ProvinciaEntity){
        return this.provinciaService
    }

    @Patch(":id")
    actualizacionParcial(@Param("id") id:number, @Body() datosParciales: Partial<ProvinciaEntity>){
        return this.provinciaService
    }

    @Delete(":id")
    eliminar(@Param("id") id:number){
        return this.provinciaService
    }
    @Patch(":id/recuperar")
    recuperarProvincia(@Param("id") id:number){
        return this.provinciaService
    }
    
}
