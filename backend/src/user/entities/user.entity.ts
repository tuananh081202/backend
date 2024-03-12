import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    maNV:string

    @Column()
    image:string

    @Column()
    name: string

    @Column()
    gender:string

    @Column()
    date_of_birth:Date

    @Column()
    CMND:number

    @Column()
    status:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @DeleteDateColumn()
    deleted_at:Date

    
}