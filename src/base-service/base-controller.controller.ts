import { Body, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { BaseService } from './base-service.service';  // Importar el servicio base
import { BaseEntity } from '@/entities/base.entity';  // Importar BaseEntity (aunque en este caso no es necesario en el controlador, es para ilustrar)
import { FindOptionsWhere } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Permissions } from '@/middlewares/decorators/permissions.decorator';
export abstract class BaseController<T extends BaseEntity> {  // Definir que T extiende BaseEntity
    constructor(private readonly service: BaseService<T>) {}  // Inyectamos el servicio BaseService para el tipo específico
    
    @Permissions(['crear'])
    @Post()
    create(@Body() data: T) {
        return this.service.create(data);  
    }

    @Permissions(['buscar'])
    @Get('all')
    getAll() {
        return this.service.find();
    }
    @Permissions(['buscar'])
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.service.findOne({ where: { id } as FindOptionsWhere<T> });
    }
    @Permissions(['actualizar'])
    @Put(':id')
    update(@Param('id') id: number, @Body() data: T) { 
        return this.service.replace(id, data); 
    }

    @Permissions(['actualizar'])
    @Patch(':id')
    updatePartial(@Param('id') id: number, @Body() data: QueryDeepPartialEntity<T>) {
        return this.service.updatePartial(id, data);
    }

    @Permissions(['eliminar'])
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);  
    }
    @Permissions(['restaurar'])
    @Patch(':id/restore')
    restore(@Param('id') id: number) {
        return this.service.restore(id); 
    }

    @Permissions(['buscar'])
    @Get()
    async getPaginated(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<T>> {
        limit = limit > 100 ? 100 : limit;
        return this.service.paginate({
            page,
            limit,
        });
    }


}

