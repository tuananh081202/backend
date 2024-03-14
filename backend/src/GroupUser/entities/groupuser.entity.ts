import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class GroupUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    MaNV: string

    @Column()
    image: string

    @Column()
    GioiTinh: string

    @Column()
    NamSinh: Date

    @CreateDateColumn()
    created_at: Date

    @Column()
    status: string

    @ManyToOne(() => User, (user) => user.groupuser,
        {
            onDelete: 'CASCADE'
        })
    user: User;

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date



}