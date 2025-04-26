import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CiudadEntity } from "./ciudad.entity";
@Entity('persona')
export class PersonaEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string
    
    @Column()
    email:string

    @Column()
    fechaNacimiento:string
    
    @ManyToOne(()=>CiudadEntity, ciudad=>ciudad.persona)
    ciudad: CiudadEntity;
}