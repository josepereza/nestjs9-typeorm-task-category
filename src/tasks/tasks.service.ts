import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepo: Repository<Task>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = new Task();
    newTask.name = createTaskDto.name;
    newTask.completed = createTaskDto.completed;
    const categoriesIds = createTaskDto.categoriesIds;
    const categories = await this.categoryRepo.findBy({
      id: In(categoriesIds),
    });
    newTask.categories = categories;
    return this.tasksRepo.save(newTask);
  }

  findAll() {
    return this.tasksRepo.find({
      relations: {
        categories: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
