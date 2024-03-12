import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    maPB:string

    @Column()
    tenPB:string

    @Column()
    description:string

    @Column({default:'Admin'})
    createdBy:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}