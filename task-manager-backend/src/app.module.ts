import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { TasksController } from './tasks/tasks.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'tengo_project',
      database: 'task_manager',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TasksModule,
    UsersModule,
    AuthModule, // Görev modülümüzü buraya ekliyoruz
  ],
})

export class AppModule {}