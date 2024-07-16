import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import {  AddSomeoneToTaskInput } from './dto/AddSomeoneTask.input';
import { AddNoteInput } from './dto/add-note-task.input';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}




  //Add someone to the Task
  @Mutation(() => Task)
  addSomeoneToTheTask(@Args('addSomeoneToTheTask') addSomeoneToTheTaskInput :AddSomeoneToTaskInput ){
    return this.taskService.add(addSomeoneToTheTaskInput);
  }


  //Adding new notes
  @Mutation(() => Task)
  addNote(@Args('addNote') addNote: AddNoteInput){
    return this.taskService.addNote(addNote)
  }
  

   

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

 


  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput.name, updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.remove(id);
  }
}
