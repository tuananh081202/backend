import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { UserTrackLogin } from "src/UserTrackLogin/entities/usertracklogin.entity";
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

    @OneToMany(() => UserTrackLogin, (usertracklogin) => usertracklogin.account)
    usertracklogin: UserTrackLogin[];

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

    @DeleteDateColumn()
    deleted_at:Date
}