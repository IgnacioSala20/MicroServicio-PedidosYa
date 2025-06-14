import {
    DeepPartial,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    Repository,
    UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';  // Importamos BaseEntity
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export abstract class BaseService<T extends BaseEntity> {
    findManyOptions: FindManyOptions<T> = {};
    findOneOptions: FindOneOptions<T> = {};

    constructor(protected repository: Repository<T>) {}

    async find(options: FindManyOptions<T> = {}): Promise<T[]> {
        const findOptions = { ...this.findManyOptions, ...options };
        return this.repository.find(findOptions);
    }
    async findOne(options: FindOneOptions<T> = {}): Promise<T | null> {
        const findOptions = { ...this.findOneOptions, ...options };
        return this.repository.findOne(findOptions);
    }

    async create(entity: DeepPartial<T>): Promise<T> {
        return this.repository.save(entity);
    }

    async updatePartial(id: string | number, entity: QueryDeepPartialEntity<T>): Promise<T> {
        await this.repository.update(id, entity);

        // Usamos las relaciones definidas en findOneOptions o findManyOptions
        const relations = this.findOneOptions.relations ?? this.findManyOptions.relations ?? [];

        const updatedEntity = await this.repository.findOne({
            where: { id } as any,
            relations,
        });

        if (!updatedEntity) {
            throw new Error(`Entidad con id ${id} no encontrada después de actualizar`);
        }
        return updatedEntity;
    } 

    async replace(id: string | number, entity: DeepPartial<T>): Promise<T> {
        const existingEntity = await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
        if (!existingEntity) {
            throw new Error(`Entidad con id ${id} no encontrado`);
        }
        //Unimos los datos para reemplazar
        const updatedEntity = { ...existingEntity, ...entity };
        //Guardamos la entidad actualizada
        await this.repository.save(updatedEntity);
        //Definimos relaciones a cargar
        const relations = this.findOneOptions.relations ?? this.findManyOptions.relations ?? [];

        //Buscamos la entidad completa con relaciones
        const replacedEntity = await this.repository.findOne({
            where: { id } as any,
            relations,
        });
        if (!replacedEntity) {
            throw new Error(`Entidad con id ${id} no encontrada después de reemplazar`);
        }
        return replacedEntity;
    }

    async delete(id: number | string):Promise<{ message: string }> {
        //Lo que hace el FindOptionsWhere es una conversion explicita de un objeto a un objeto FindOptionsWhere
        const entity = await this.repository.findOneBy({id} as FindOptionsWhere<T>);
        if (!entity) {
            throw new Error(`Entidad con id ${id} no encontrado`);
        }
        await this.repository.softDelete(id);
        return {"message": "deleted" };
    }
    async restore(id: number | string): Promise<T> {
        const entity = await this.repository.findOne({
            where: { id } as FindOptionsWhere<T>,
            withDeleted: true,
        });
        if (!entity) {
            throw new Error(`Entidad con id ${id} no encontrado`);
        }
        await this.repository.restore(id);
        const restored = await this.repository.findOneBy({ id } as FindOptionsWhere<T>);
        if (!restored) {
            throw new Error(`Entidad con id ${id} no restaurable`);
        }
        return restored;
    }
    async paginate(options: IPaginationOptions): Promise<Pagination<T>> {
        const queryBuilder = this.repository.createQueryBuilder('entity');
        queryBuilder.orderBy('entity.id', 'ASC'); // orden por defecto, se puede organizar segun como querramos 
        //ASC es ascendente y DESC es descendente
        return paginate<T>(queryBuilder, options);
    }
}