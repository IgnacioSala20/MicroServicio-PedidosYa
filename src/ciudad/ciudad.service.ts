import { CiudadEntity } from '@/entities/ciudad.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CiudadService {
    constructor(@InjectRepository(CiudadEntity) private ciudadRepository: Repository<CiudadEntity>){}

    async crear(ciudad: CiudadEntity){
        const ciudadExistente= await this.ciudadRepository.findOne({where: {nameCiudad: ciudad.nameCiudad}, withDeleted:true})

        if (ciudadExistente){
            if(ciudadExistente.deletedAt){
                await this.ciudadRepository.recover(ciudadExistente);
                return { message: 'Ciudad restaurada correctamente', ciudad: ciudadExistente };
            } else {
                return { message: 'La ciudad ya existe y esta activa'};
            }
        }
        const nuevaCiudad=this.ciudadRepository.create(ciudad)
        return await this.ciudadRepository.save(nuevaCiudad)
    }

    async getCiudades(): Promise<CiudadEntity[]>{
        return this.ciudadRepository.find();
    }

    async getCiudadPorId(id: number):Promise<CiudadEntity>{
        const ciudad=await this.ciudadRepository.findOne({where:{id}});
        if (!ciudad){
            throw new Error(`ciudad con id ${id} no encontrado.`);
        }
        return ciudad;
    }

    async actualizacionTotal(id:number, datosTotales:CiudadEntity){
        await this.ciudadRepository.update(id,datosTotales)
        return this.ciudadRepository.findOneBy({id})
    }

    async actualizacionParcial(id:number, datosParciales:Partial<CiudadEntity>){
        await this.ciudadRepository.update(id,datosParciales)
        return this.ciudadRepository.findOneBy({id})
    }
    async eliminarCiudad(id:number){
        const ciudad=await this.ciudadRepository.findOne({where: {id}})
        if(!ciudad){
            throw new NotFoundException(`Ciudad con id ${id} no encontrada`)
        }
        await this.ciudadRepository.softRemove(ciudad)
        return {message: "deleted"}
    }

    async restautarCiudad(id:number){
        const ciudad=await this.ciudadRepository.findOne({where:{id}, withDeleted:true})
        console.log(ciudad)
        if (!ciudad || !ciudad.deletedAt){
            throw new NotFoundException(`Pais con id ${id} no encontrado o no está eliminado`);
        }
        
        await this.ciudadRepository.restore(id)
        return { message: 'Ciudad restaurada correctamente' };
    }
}
