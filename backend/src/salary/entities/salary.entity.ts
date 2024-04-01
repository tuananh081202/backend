import { Position } from "src/position/entities/position.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Salary {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    MaLuong: string

    @Column()
    LuongThang: number

    @Column()
    NgayCong: number

    @Column()
    ThucLanh: number

    @Column()
    PhuCap: number
    
    @Column()
    TamUng: number

    @Column()
    NgayTinhLuong: string

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