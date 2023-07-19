import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Category } from '../../categories/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToMany(() => Category, (category) => category.tasks)
  @JoinTable({
    name: 'tasks_categories',
    joinColumn: {
      name: 'task_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'profile_id' })
  user: User;
}
