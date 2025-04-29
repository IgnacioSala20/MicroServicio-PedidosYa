import { PersonaEntity } from '@/entities/persona.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonaService {
    constructor(@InjectRepository(PersonaEntity) private personaRepository:Repository<PersonaEntity>){}

    async crear(datosPersona: PersonaEntity){
        const personaExistente = await this.personaRepository.findOne({where: { name: datosPersona.name },withDeleted: true});
        if (personaExistente) {
            if (personaExistente.deletedAt) {
                await this.personaRepository.recover(personaExistente);
                return { message: 'Persona restaurado correctamente', pais: personaExistente };
            } else {
                return { message: 'La Persona ya existe y esta activa'};
            }
        }
        const nuevaPersona = this.personaRepository.create(datosPersona);
        return await this.personaRepository.save(nuevaPersona);
    }

    async getPersonas():Promise<PersonaEntity[]>{
        return this.personaRepository.find();
    }

    async getPersonaPorId(id: number):Promise<PersonaEntity>{
        const persona=await this.personaRepository.findOne({where: {id}})
        if(!persona){
            throw new Error(`Persona con id ${id} no encontrado.`);
        }
        return persona;
    }

    async actualizacionTotal(id:number, datosTotales:PersonaEntity){
        await this.personaRepository.update(id,datosTotales)
        return this.personaRepository.findOneBy({id})
    }
    async actualizacionParcial(id:number, datosParciales:Partial<PersonaEntity>){
        await this.personaRepository.update(id,datosParciales)
        return this.personaRepository.findOneBy({id})
    }

    async eliminarPersona(id:number){
        const personaExistente=await this.personaRepository.findOne({where:{id}})

        if (!personaExistente){
            throw new NotFoundException(`Persona con id ${id} no encontrado`);
        }
        await this.personaRepository.softRemove(personaExistente)
        return {message: "deleted"}
    }

    async restaurarPersona(id:number){
        const personaExistente= await this.personaRepository.findOne({where: {id},withDeleted:true})
        if (!personaExistente || !personaExistente.deletedAt){
            throw new NotFoundException(`Persona con id ${id} no encontrada o no está eliminado`);
        }
        await this.personaRepository.restore(id)
        return { message: 'Persona restaurada correctamente' };
    }

}
