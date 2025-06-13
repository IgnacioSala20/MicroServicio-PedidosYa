import {  Column, Entity, OneToMany } from "typeorm";
import { ProvinciaEntity } from "./provincia.entity";
import { BaseEntity } from "./base.entity";

@Entity('pais')
export class PaisEntity extends BaseEntity{
    @Column()
    name:string
    
    @OneToMany(() => ProvinciaEntity, provincias => provincias.paises)
    provincias: ProvinciaEntity[];
}