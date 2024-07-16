import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema, Types } from 'mongoose';
import { Auth } from 'src/auth/entities/auth.entity';



export enum Priority {
  HIGH,
  NORMAL,
  LOW,
}

registerEnumType(Priority, {
  name: 'Priority',
});

@ObjectType()
@Schema()
export class Task {
  
  @Field(() => String)
 _id: MongooSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  creator: string;


  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => Priority)
  @Prop()
  properity: Priority;

  @Field(() => [Auth])
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Auth' }], required:false })
  Auths: Auth[]

  @Field(() => [String])
  @Prop({ type: [String], default: [] })
  notes: string[];
  

  
}


export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
