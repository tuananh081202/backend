import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Salary } from "src/salary/entities/salary.entity";
import { Trip } from "src/trip/entities/trip.entity";
import { User } from "src/user/entities/user.entity";

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

    @OneToMany(() => Salary, (salary) => salary.position)
    salarys: Salary;

    @OneToMany(() => Trip, (trip) => trip.position)
    trip: Trip;

    @OneToMany(()=> User,(user)=>user.position)
    user: User
}