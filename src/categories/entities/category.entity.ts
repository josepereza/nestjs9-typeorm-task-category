import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Task, (task) => task.categories)
  tasks: Task[];
}