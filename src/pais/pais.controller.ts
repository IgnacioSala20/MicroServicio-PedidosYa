import { Body, Controller,Delete,Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PaisService } from './pais.service';
import { PaisEntity } from '@/entities/pais.entity';

@Controller('pais')
export class PaisController {
    constructor(private readonly paisService: PaisService){}

    @Get()
    buscarPaises(){
        return this.paisService.getPaises()
    } 
    @Post()
    crearPais(@Body() pais: PaisEntity){
        return this.paisService.create(pais)
    }

    @Get(':id')
    buscarPaisPorId(@Param('id') id:number){
        return this.paisService.getPaisPorId(id);
    }

    @Put(':id')
    actualizacionTotal(@Param('id') id:number, @Body() datosTotales:PaisEntity){
        return this.paisService.actualizacionTotal(id,datosTotales)
    }
    @Patch(':id')
    actualizacionParcial(@Param('id') id:number, @Body() datosParciales: Partial<PaisEntity>){
        return this.paisService.actualizacionParcial(id,datosParciales)
    }
    @Patch(':id/restaurar')
    restaurarPais(@Param('id') id: number) {
        return this.paisService.restaurarPais(id);
    }
    
    @Delete(':id')
    eliminarPais(@Param('id') id:number){
        return this.paisService.eliminarPais(id)
    }
}
