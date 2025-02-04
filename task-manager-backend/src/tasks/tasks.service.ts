import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { NotFoundError } from 'rxjs';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
// import { User } from 'src/users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ){}

  // async getAllTasks(): Promise<Task[]> {
  //   return this.taskRepository.find();
  // }  

  async getAllTasksForUser(userId: string): Promise<Task[]>{
    return this.taskRepository.find({where : {user: {id: userId}}, 
    relations: ['user'],
    });
  } 

  async createTask(title: string, description: string, userId: string): Promise<Task>{
    const task = this.taskRepository.create({
        title, 
        description,
        status : 'open',
        user: {id: userId},
    });
    return this.taskRepository.save(task);
  }

  async updateTask(id: string, updateTaskDto: Partial<CreateTaskDto>): Promise<Task> {
    const task = await this.taskRepository.findOne({where : {id}});
    if(!task){
      throw new NotFoundException(`Görev Bulunamadi: ${id}`);
    }

    Object.assign(task, updateTaskDto);
    return await this.taskRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.taskRepository.findOne({where :{id}});
    if(!task) {
      throw new NotFoundException(`Görev Bulunamadı : ${id}`);
    }
    await this.taskRepository.remove(task);
  }
}