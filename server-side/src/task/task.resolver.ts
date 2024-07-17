import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import {  AddSomeoneToTaskInput } from './dto/AddSomeoneTask.input';
import { AddNoteInput } from './dto/add-note-task.input';
import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/Guard/jwt.guard';

@Resolver(() => Task)

export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}




  //Add someone to the Task
  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  addSomeoneToTheTask(@Args('addSomeoneToTheTask') addSomeoneToTheTaskInput :AddSomeoneToTaskInput ){
    return this.taskService.add(addSomeoneToTheTaskInput);
  }


  //Adding new notes
  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  addNote(@Args('addNote') addNote: AddNoteInput){
    return this.taskService.addNote(addNote)
  }

  @Mutation(() => [Task])
  @UseGuards(JwtAuthGuard)
  async showTask(@Args('name') name: string, @Context() context: any) {
    const req = context.req;
    if (!req || !req.user) {
      throw new Error('User not authenticated');
    }

    const events = await this.taskService.findAllWhosTheAuthor(req.user.name, name);
    
    
    return events
  }

   

  @Mutation(() => Task)
  @UseGuards(JwtAuthGuard)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

 


  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput.name, updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask(@Args('name') name: string) {
    return this.taskService.remove(name );
  }

  @Mutation(() => String)
  async subscribe(@Args('pubUsername') pubUsername: string): Promise<string> {
    try {
      const message = await this.taskService.subscribe(pubUsername);
      return message;
    } catch (error) {
      
      throw new Error(`Subscription failed: ${error.message}`);
    }
  }
}
