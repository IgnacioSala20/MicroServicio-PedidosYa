import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { PaisEntity } from "./pais.entity";
import { CiudadEntity } from "./ciudad.entity";
import { BaseEntity } from "./base.entity";

@Entity('provincia')
export class ProvinciaEntity extends BaseEntity{
    @Column()
    name:string

    @OneToMany(()=>CiudadEntity, ciudades=>ciudades.provincia)
    ciudad: CiudadEntity[];

    @ManyToOne(() => PaisEntity, paises => paises.provincia)
    pais: PaisEntity;
}