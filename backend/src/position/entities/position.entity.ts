import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Position {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    maCV:string

    @Column()
    namePosition:string

    @Column()
    degree:string

    @Column()
    salary:number

    @Column()
    description:string

    @Column({default:'Admin'})
    createdBy:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
    
    @DeleteDateColumn()
    deleted_at:Date
}