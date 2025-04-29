import { ProvinciaEntity } from '@/entities/provincia.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinciaService {
    constructor(@InjectRepository(ProvinciaEntity) private provinciaRepository:Repository<ProvinciaEntity>){}

    async crear(provincia: ProvinciaEntity){
        const provinciaExistente= await this.provinciaRepository.findOne({where: {name: provincia.name}, withDeleted:true})

        if (provinciaExistente){
            if(provinciaExistente.deletedAt){
                await this.provinciaRepository.recover(provinciaExistente);
                return { message: 'provincia restaurada correctamente', provincia: provinciaExistente };
            } else {
                return { message: 'La provincia ya existe y esta activa'};
            }
        }
        const nuevaProvincia=this.provinciaRepository.create(provincia)
        return await this.provinciaRepository.save(nuevaProvincia)
    }
    async getProvincias():Promise<ProvinciaEntity[]>{
        return this.provinciaRepository.find();
    }

    async getProvinciaPorId(id:number):Promise<ProvinciaEntity>{
        const ciudad=await this.provinciaRepository.findOne({where:{id}})
        if(!ciudad){
            throw new Error(`ciudad con id ${id} no encontrado.`);
        }
        return ciudad;
    }

    async actualizacionTotal(id:number, datosTotales:ProvinciaEntity){
        await this.provinciaRepository.update(id,datosTotales)
        return this.provinciaRepository.findOneBy({id})
    }

    async actualizacionParcial(id:number, datosParciales:Partial<ProvinciaEntity>){
        await this.provinciaRepository.update(id,datosParciales)
        return this.provinciaRepository.findOneBy({id})
    }
    async eliminarProvincia(id:number){
        const provincia=await this.provinciaRepository.findOne({where: {id}})
        if(!provincia){
            throw new NotFoundException(`Provincia con id ${id} no encontrada`)
        }
        await this.provinciaRepository.softRemove(provincia);
        return { message: 'deleted' };
    }

    async restaurarProvincia(id:number){
        const provincia= await this.provinciaRepository.findOne({where: {id},withDeleted:true})
        if (!provincia || !provincia.deletedAt){
            throw new NotFoundException(`Provincia con id ${id} no encontrada`)
        }
        await this.provinciaRepository.restore(id)
        return { message: 'Provincia restaurada correctamente' };
    }
    
}
