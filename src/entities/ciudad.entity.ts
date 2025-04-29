import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, DeleteDateColumn } from "typeorm";
import { ProvinciaEntity } from "./provincia.entity";
import { PersonaEntity } from "./persona.entity";

@Entity('ciudad')
export class CiudadEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string

    @OneToMany(()=> PersonaEntity, persona=>persona.ciudad)
    persona: PersonaEntity[];
    
    @ManyToOne(()=> ProvinciaEntity, provincia=>provincia.ciudad)
    provincia: ProvinciaEntity;

    @DeleteDateColumn()
    deletedAt?: Date | null; // Esto es lo que marca la eliminación "suave"
}