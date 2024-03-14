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
    password:string

    @Column()
    phoneNumber: number

    @Column({nullable:true ,default:null})
    refresh_token: string;

    @Column({nullable:true ,default:null})
    reset_password_token:string

    @Column()
    roles:string

    @Column()
    status:number

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