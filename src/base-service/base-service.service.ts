import {
    BaseEntity,
    DeepPartial,
    FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    Repository,
    UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseService<T extends BaseEntity & { id: number | string }> {
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

    async update(
    id: string | number,
    entity: QueryDeepPartialEntity<T>,
    ): Promise<UpdateResult> {
    return this.repository.update(id, entity);
    }

    //Borrado logico! , no contempla borrado total
    async delete(id: number | string):Promise<{ message: string }> {
    //Lo que hace el FindOptionsWhere es una conversion explicita de un objeto a un objeto FindOptionsWhere
    const entity = await this.repository.findOneBy({id} as FindOptionsWhere<T>);
    if (!entity) {
        throw new Error(`Entity with id ${id} not found`);
    }
    return {"message": "deleted" };
    }
}
/*
    async create(datos: PaisEntity) {
        const paisExistente = await this.paisRepository.findOne({where: { name: datos.name },withDeleted: true});
        if (paisExistente) {
            if (paisExistente.deletedAt) {
                await this.paisRepository.recover(paisExistente);
                return { message: 'País restaurado correctamente', pais: paisExistente };
            } else {
                return { message: 'El país ya existe y esta activo'};
            }
        }
        const nuevoPais = this.paisRepository.create(datos);
        return await this.paisRepository.save(nuevoPais);
    }
        async getPaises():Promise<PaisEntity[]>{
        return this.paisRepository.find();
    }
    
 */