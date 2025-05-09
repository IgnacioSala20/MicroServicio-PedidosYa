import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ProvinciaEntity } from '@/entities/provincia.entity';

@Controller('province')
export class ProvinciaController {
    constructor(private readonly provinciaService: ProvinciaService){}

    @Post()
    crearProvincia(@Body() datosProvincia:ProvinciaEntity){
        return this.provinciaService.create(datosProvincia)
    }
    @Get()
    obtenerProvincias(){
        return this.provinciaService.find()
    }
    @Get(":id")
    obtenerProvinciasPorId(@Param("id") id:number){
        return this.provinciaService.findOne({ where: { id: Number(id) } })
    }
    @Put(":id")
    actualizacionTotal(@Param("id") id:number, @Body() datosTotal: ProvinciaEntity){
        return this.provinciaService.update(id, datosTotal)
    }
    @Patch(":id")
    actualizacionParcial(@Param("id") id:number, @Body() datosParciales: Partial<ProvinciaEntity>){
        return this.provinciaService.update(id,datosParciales)
    }
    @Delete(":id")
    eliminar(@Param("id") id:number){
        return this.provinciaService.delete(id)
    }
    
}
