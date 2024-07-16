import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { UpdateTaskInput } from './update-task.input';
@InputType()
export class AddSomeoneToTaskInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;
}