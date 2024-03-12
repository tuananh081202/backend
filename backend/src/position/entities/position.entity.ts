import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Position {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    maCV:string

    @Column()
    namePosition:string

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
    
}