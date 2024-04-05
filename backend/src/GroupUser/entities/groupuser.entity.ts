import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class GroupUser {
    @PrimaryGeneratedColumn()
    id: number
 
    @Column()
    MaNhom:string

    @Column()
    TenNhom:string

    @Column()
    image: string

    @Column()
    GioiTinh: string

    @Column()
    NamSinh: string
    
    @Column()
    MoTa:string
    
    @Column()
    createdBy:string

    @Column()
    status: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @ManyToOne(() => User, (user) => user.groupuser,
    {
        onDelete: 'CASCADE'
    })
    user: User;


}