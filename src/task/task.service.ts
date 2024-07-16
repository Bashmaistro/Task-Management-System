import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {  Task, TaskDocument } from './entities/task.entity';
import { AuthService } from 'src/auth/auth.service';
import { AddSomeoneToTaskInput } from './dto/AddSomeoneTask.input';
import { AddNoteInput } from './dto/add-note-task.input';

@Injectable()
export class TaskService {

  constructor(@InjectModel(Task.name)
   private taskModel:Model<TaskDocument>,
   private authService: AuthService ){

  }

  async add(addSomeoneToTheTask: AddSomeoneToTaskInput){

    const findedUser = await this.authService.findOneByEmail(addSomeoneToTheTask.email);
    
    const findedTask = await this.findOne(addSomeoneToTheTask.name);

    findedTask.Auths.push(findedUser);


    return this.taskModel.findByIdAndUpdate(findedTask._id , findedTask ,{new: true} )

  }
  create(createTaskInput: CreateTaskInput) {
    const task = new this.taskModel(createTaskInput);

    return task.save();
  } 


  async addNote(addNoteInput : AddNoteInput){

    const task = await this.findOne(addNoteInput.name);
    task.notes.push(addNoteInput.note);

    return this.taskModel.findByIdAndUpdate(task._id , task, {new: true})


  }


  findAll() {
    return `This action returns all task`;
  }

  findOne(name: string) {
    return this.taskModel.findOne({name:name});
  }

  update(name: string, updateTaskInput: UpdateTaskInput) {
    return this.taskModel.findOneAndUpdate({name: name},updateTaskInput, {new: true} );
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
