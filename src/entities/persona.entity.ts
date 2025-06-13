import { Column, Entity, ManyToOne } from "typeorm";
import { CiudadEntity } from "./ciudad.entity";
import { BaseEntity } from "./base.entity";
@Entity('persona')
export class PersonaEntity extends BaseEntity{
    @Column()
    name:string
    
    @Column()
    email:string

    @Column()
    fechaNacimiento:string
    
    @ManyToOne(()=>CiudadEntity, ciudades=>ciudades.personas)
    ciudades: CiudadEntity;
}