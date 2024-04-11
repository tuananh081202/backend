import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Chamcong{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=> User,(user)=> user.chamcong,
    {
        onDelete:'CASCADE'
    })
    user: User

    @Column()
    HoTen:string

    @Column()
    GioVao:string

    @Column()
    GioRa:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @DeleteDateColumn()
    deleted_at:Date



}