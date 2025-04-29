import { BaseEntity, Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @DeleteDateColumn()
    deletedAt?: Date | null; // Esto es lo que marca la eliminación "suave"
}