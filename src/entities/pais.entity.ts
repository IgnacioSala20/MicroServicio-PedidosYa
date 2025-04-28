import { BaseEntity, Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProvinciaEntity } from "./provincia.entity";

@Entity('pais')
export class PaisEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string
    
    @OneToMany(() => ProvinciaEntity, provincia => provincia.pais)
    provincias: ProvinciaEntity[];

    @DeleteDateColumn()
    deletedAt?: Date | null; // Esto es lo que marca la eliminación "suave"
}