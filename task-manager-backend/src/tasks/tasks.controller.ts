import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { User } from 'src/users/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Request() req: ExpressRequest) {
    const userId = (req.user as User).id;
    return this.tasksService.getAllTasksForUser(userId);
  }

  @Post()
  createTask(@Body() body: { title: string; description: string },
             @Request() req: ExpressRequest) {
    const userId = (req.user as User).id;
    return this.tasksService.createTask(body.title, body.description, userId);
  }

  @Put('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<{message: string}> {
    await this.tasksService.deleteTask(id);
    return { message : `Görev ${id} basariyla silindi.` };
  }

}