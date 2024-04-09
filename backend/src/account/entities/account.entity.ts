import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
@Entity()
export class Account{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    avatar:string

    @Column()
    fullName:string

    @Column()
    email:string

    @Column()
    displayName:string

    @Column()
    password:string

    @Column()
    phoneNumber: number

    @Column({nullable:true ,default:null})
    refresh_token: string;

    @Column({nullable:true ,default:null})
    resetToken:string

    @Column()
    roles:string

    @Column()
    status:string

    @ManyToOne(() => User, (user) => user.account,{
        onDelete:'CASCADE'
    })
    user: User;

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @DeleteDateColumn()
    deleted_at:Date
}