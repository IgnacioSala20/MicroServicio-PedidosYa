import { PaisEntity } from '@/entities/pais.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

@Injectable()
export class PaisService {
    constructor(@InjectRepository(PaisEntity) private paisRepository: Repository<PaisEntity>) {}

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
    
    async getPaisPorId(id: number): Promise<PaisEntity>{
        const pais=await this.paisRepository.findOne({where:{id}});
        if (!pais){
            throw new Error(`Pais con id ${id} no encontrado.`);
        }
        return pais;
    }

    async actualizacionTotal(id:number, datosTotales:PaisEntity){
        await this.paisRepository.update(id, datosTotales); //Actualizo el Pais
        return this.paisRepository.findOneBy({ id }); //Devuelvo el pais modificado
    }

    async actualizacionParcial(id:number, datosParciales:Partial<PaisEntity>){
        await this.paisRepository.update(id, datosParciales)
        return this.paisRepository.findOneBy({id});
    }


    async restaurarPais(id: number) {
        const pais = await this.paisRepository.findOne({ where: { id }, withDeleted: true });
        if (!pais || !pais.deletedAt) {
            throw new NotFoundException(`Pais con id ${id} no encontrado o no está eliminado`);
        }
        await this.paisRepository.restore(id); //restaurar pais con ese id
        return { message: 'País restaurado correctamente' };
    }
    async eliminarPais(id: number) {
        const pais = await this.paisRepository.findOne({ where: { id } });
        if (!pais) {
            throw new NotFoundException(`Pais con id ${id} no encontrado`);
        }
        await this.paisRepository.softRemove(pais);
        return { message: 'País eliminado correctamente' };
    }
}
