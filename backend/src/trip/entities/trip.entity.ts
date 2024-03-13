import { Position } from "src/position/entities/position.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Trip {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    MaCongTac:string
    
    @Column()
    NgayBatDau:Date

    @Column()
    NgayKetThuc:Date

    @Column()
    DiaDiem:string

    @Column({default:'textlong'})
    MucDich:string

    @CreateDateColumn()
    created_at:Date
 
    @UpdateDateColumn()
    updated_at:Date

    @DeleteDateColumn()
    delete_at:Date

    @ManyToOne(() => Position, (position) => position.trip,
        {
            onDelete: 'CASCADE'
        })
    position: Position;

    @ManyToOne(() => User, (user) => user.trip,
        {
            onDelete: 'CASCADE'
        })
    user: User;


}