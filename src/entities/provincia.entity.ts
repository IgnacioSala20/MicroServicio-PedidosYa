import { BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaisEntity } from "./pais.entity";
import { CiudadEntity } from "./ciudad.entity";

@Entity('provincia')
export class ProvinciaEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string

    @OneToMany(()=>CiudadEntity, ciudad=>ciudad.provincia)
    ciudad: CiudadEntity[];

    @ManyToOne(() => PaisEntity, pais => pais.provincias)
    pais: PaisEntity;
}