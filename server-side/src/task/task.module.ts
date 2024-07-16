import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TaskRedisService } from './task.redis.service';


@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([{
      name: Task.name,
      schema: TaskSchema
  
  }])
  ],
  providers: [TaskResolver, TaskService, TaskRedisService],
})
export class TaskModule {}
