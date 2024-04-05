import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Kyluat {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    MaKyLuat:string

    @Column()
    TenKyLuat:string

    @Column()
    NgayQuyetDinh:string

    @Column()
    TenLoai: string

    @Column()
    HinhThuc: string

    @Column()
    SoTien: number

    @Column()
    NgayKyLuat: string

    @Column()
    MoTa: string

    @Column({default:'Admin'})
    NguoiTao: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at:Date

    @DeleteDateColumn()
    deleted_at:Date

    @ManyToOne(()=> User,(user) => user.kyluat,
    {
        onDelete:'CASCADE'
    })
    user: User;

}