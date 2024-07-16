import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Auth {
  

@Field(() => String)
_id: MongooSchema.Types.ObjectId;

@Field(() => String)
@Prop()
name: string;

@Field(() => String)
@Prop({ unique: true })
email: string;

@Field(() => String)
@Prop()
password: string;


}

export type AuthDocument = Auth & Document;
export const AuthSchema = SchemaFactory.createForClass(Auth);
