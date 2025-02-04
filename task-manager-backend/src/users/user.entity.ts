import { Task } from "src/tasks/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique : true})
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt : Date;

    @OneToMany(() => Task, (task) => task.user, { eager: true })
    tasks: Task[];
}