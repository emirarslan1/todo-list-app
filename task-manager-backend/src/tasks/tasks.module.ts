import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // TypeORM'a Task Entity'sini ekliyoruz
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}