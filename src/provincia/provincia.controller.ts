import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ProvinciaEntity } from '@/entities/provincia.entity';

@Controller('province')
export class ProvinciaController {
    constructor(private readonly provinciaService: ProvinciaService){}

    @Post()
    crearProvincia(@Body() datosProvincia:ProvinciaEntity){
        return this.provinciaService.crear(datosProvincia)
    }

    @Get()
    obtenerProvincias(){
        return this.provinciaService.getProvincias()
    }

    @Get(":id")
    obtenerProvinciasPorId(@Param("id") id:number){
        return this.provinciaService.getProvinciaPorId(id)
    }

    @Put(":id")
    actualizacionTotal(@Param("id") id:number, @Body() datosTotal: ProvinciaEntity){
        return this.provinciaService.actualizacionTotal(id, datosTotal)
    }

    @Patch(":id")
    actualizacionParcial(@Param("id") id:number, @Body() datosParciales: Partial<ProvinciaEntity>){
        return this.provinciaService.actualizacionParcial(id,datosParciales)
    }

    @Delete(":id")
    eliminar(@Param("id") id:number){
        return this.provinciaService.eliminarProvincia(id)
    }
    @Patch(":id/recuperar")
    recuperarProvincia(@Param("id") id:number){
        return this.provinciaService.restaurarProvincia(id)
    }
    
}
