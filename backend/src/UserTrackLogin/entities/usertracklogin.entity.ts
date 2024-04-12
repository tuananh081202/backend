
import { Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

export class UserTrackLogin {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    ip_address:string

    @Column()
    type:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @ManyToOne(()=> User,(user)=> user.usertracklogin,
    {
        onDelete:'CASCADE'
    })
    user: User
}