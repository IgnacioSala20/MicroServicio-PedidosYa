import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { ProvinciaEntity } from "./provincia.entity";
import { PersonaEntity } from "./persona.entity";

@Entity('ciudad')
export class CiudadEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    idCiudad: number;

    @Column()
    nameCiudad:string

    @OneToMany(()=> PersonaEntity, persona=>persona.ciudad)
    persona: PersonaEntity[];
    
    @ManyToOne(()=> ProvinciaEntity, provincia=>provincia.ciudad)
    provincia: ProvinciaEntity;
}