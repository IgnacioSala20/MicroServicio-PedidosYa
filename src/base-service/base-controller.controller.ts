import { Body, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BaseService } from './base-service.service';  // Importar el servicio base
import { BaseEntity } from '@/entities/base.entity';  // Importar BaseEntity (aunque en este caso no es necesario en el controlador, es para ilustrar)
import { FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseController<T extends BaseEntity> {  // Definir que T extiende BaseEntity
    constructor(private readonly service: BaseService<T>) {}  // Inyectamos el servicio BaseService para el tipo específico
    @Post()
    create(@Body() data: T) {
        return this.service.create(data);  
    }
    @Get()
    findAll() {
        return this.service.find();  
    }
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne({ where: { id } as FindOptionsWhere<T> });
    }
    @Put(':id')
    update(@Param('id') id: number, @Body() data: QueryDeepPartialEntity<T>) { 
        return this.service.update(id, data); 
    }
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);  
    }
    @Patch(':id/restore')
    restore(@Param('id') id: number) {
        return this.service.restore(id); 
    }


}
