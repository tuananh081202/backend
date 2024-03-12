import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class EmployeeType {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    MaLoai:string

    @Column()
    LoaiNV:string

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