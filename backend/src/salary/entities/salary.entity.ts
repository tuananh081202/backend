import { Position } from "src/position/entities/position.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Salary {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    MaLuong: string
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    LuongGio: number;

    @Column()
    SoGioLam: number;

    @Column()
    SoGioNghi:number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    PhuCap: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    ThucLanh: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    TamUng: number;

    @Column()
    NgayTinhLuong: string

    @Column()
    description: string

    @Column()
    NguoiTao: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    @ManyToOne(() => Position, (position) => position.salarys,
        {
            onDelete: 'CASCADE'
        })
    position: Position;

    @ManyToOne(() => User, (user) => user.salary,
        {
            onDelete: 'CASCADE'
        })
    user: User;
}