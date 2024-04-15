import { Account } from "src/account/entities/account.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserTrackLogin {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ip_address:string

    @Column()
    type: string

    @CreateDateColumn()
    created_at: Date

    // @UpdateDateColumn()
    // updated_at: Date

    @ManyToOne(() => Account, (account) => account.usertracklogin, {
        onDelete: 'CASCADE'
    })
    account: Account;
}