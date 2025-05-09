import { Body, Controller,Delete,Get, Param, Patch, Post, Put } from '@nestjs/common';
import { PaisService } from './pais.service';
import { PaisEntity } from '@/entities/pais.entity';

@Controller('country')
export class PaisController {
    constructor(private paisService: PaisService){}
    @Get()
    buscarPaises(){
        return this.paisService.find()
    } 
    @Post()
    crearPais(@Body() pais: PaisEntity){
        return this.paisService.create(pais)
    }
    @Get(':id')
    buscarPaisPorId(@Param('id') id: string | number) {
        return this.paisService.findOne({ where: { id: Number(id) } }); // Aseguramos que id sea un número
    }

    @Put(':id')
    actualizacionTotal(@Param('id') id:number, @Body() datosTotales:PaisEntity){
        return this.paisService.update(id,datosTotales)
    }
    @Patch(':id')
    actualizacionParcial(@Param('id') id:number, @Body() datosParciales: Partial<PaisEntity>){
        return this.paisService.update(id,datosParciales)
    }
    @Delete(':id')
    eliminarPais(@Param('id') id:number){
        return this.paisService.delete(id)
    }
}
