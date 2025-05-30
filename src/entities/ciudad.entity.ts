import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ProvinciaEntity } from "./provincia.entity";
import { PersonaEntity } from "./persona.entity";
import { BaseEntity } from "./base.entity";

@Entity('ciudad')
export class CiudadEntity extends BaseEntity{
    @Column()
    name:string

    @OneToMany(()=> PersonaEntity, persona=>persona.ciudad)
    persona: PersonaEntity[];
    
    @ManyToOne(()=> ProvinciaEntity, provincia=>provincia.ciudad)
    provincia: ProvinciaEntity;
}