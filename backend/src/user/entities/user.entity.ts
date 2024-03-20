import {  GroupUser } from "src/GroupUser/entities/groupuser.entity";
import { Account } from "src/account/entities/account.entity";
import { Salary } from "src/salary/entities/salary.entity";
import { Trip } from "src/trip/entities/trip.entity";
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
    birthplace:string
    
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

    @OneToMany(() => Salary, (salary) => salary.user)
    salary: Salary[];

    @OneToMany(() => Trip, (trip) => trip.user)
    trip: Trip[];

    @OneToMany(() => GroupUser, (groupuser) => groupuser.user)
    groupuser: GroupUser[];
}