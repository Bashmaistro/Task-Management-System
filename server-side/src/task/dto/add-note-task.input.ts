import { ArgsType, Field, InputType } from '@nestjs/graphql';


@InputType()
export class AddNoteInput {
  @Field(() => String)
  note: string;

  @Field(() => String)
  name: string;
}