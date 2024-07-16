import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {  Task, TaskDocument } from './entities/task.entity';
import { AuthService } from 'src/auth/auth.service';
import { AddSomeoneToTaskInput } from './dto/AddSomeoneTask.input';
import { AddNoteInput } from './dto/add-note-task.input';

import { TaskRedisService } from './task.redis.service';
import { Socket } from 'socket.io';

@Injectable()
export class TaskService {

  constructor(@InjectModel(Task.name)
   private taskModel:Model<TaskDocument>,
   private authService: AuthService ,private taskRedis: TaskRedisService ){

  }

  async add(addSomeoneToTheTask: AddSomeoneToTaskInput){

    const findedUser = await this.authService.findOneByEmail(addSomeoneToTheTask.email);
    
    const findedTask = await this.findOne(addSomeoneToTheTask.name);

    findedTask.Auths.push(findedUser);


    return this.taskModel.findByIdAndUpdate(findedTask._id , findedTask ,{new: true} )

  }
  create(createTaskInput: CreateTaskInput) {
    
    const task = new this.taskModel(createTaskInput);

    const { name, description, properity } = createTaskInput;

    const eventBody = { name, description, properity };

    this.taskRedis.publish(createTaskInput.creator , eventBody);
    
    

    return task.save();
  } 


  async addNote(addNoteInput : AddNoteInput){

    const task = await this.findOne(addNoteInput.name);
    task.notes.push(addNoteInput.note);

    return this.taskModel.findByIdAndUpdate(task._id , task, {new: true})


  }




  async findAllWhosTheAuthor(name: string, creator: string) {

    const tasks = await this.taskModel.find({creator: creator});

    const events = tasks.reduce((acc, task) => {
      const filteredEvents = task.Auths.filter(auth => auth.name === name);
      return [...acc, ...filteredEvents];
   }, []);

   return events;




    
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
