import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { PaisEntity } from "./pais.entity";
import { CiudadEntity } from "./ciudad.entity";
import { BaseEntity } from "./base.entity";

@Entity('provincia')
export class ProvinciaEntity extends BaseEntity{
    @Column()
    name:string

    @OneToMany(() => CiudadEntity, ciudades => ciudades.provincias)
    ciudades: CiudadEntity[];


    @ManyToOne(() => PaisEntity, paises => paises.provincias)
    paises: PaisEntity;
}