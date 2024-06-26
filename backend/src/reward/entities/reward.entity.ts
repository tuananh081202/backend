import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Reward {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    MaKhenThuong:string

    @Column()
    TenKhenThuong: string

    @Column()
    NgayQuyetDinh: string

    @Column()
    HinhThuc: string

    @Column()
    SoTien: number

    @Column()
    NgayKhenThuong: string

    @Column()
    MoTa:string

    @Column()
    NguoiTao:string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at:Date

    @ManyToOne(()=> User,(user) => user.reward,{
        onDelete:'CASCADE'
    })
    user: User;
}