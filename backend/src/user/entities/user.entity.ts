import { Account } from "src/account/entities/account.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToMany(() => Account, (account) => account.user)
    account: Account[];

    
}