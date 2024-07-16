import { CreateAuthInput } from './create-auth.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import {Schema as MongooSchema} from 'mongoose'
@InputType()
export class UpdateAuthInput extends PartialType(CreateAuthInput) {
  @Field(() => String)
  _id:  MongooSchema.Types.ObjectId;




}
