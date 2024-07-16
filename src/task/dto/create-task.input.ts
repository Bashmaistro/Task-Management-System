import { Field, InputType } from "@nestjs/graphql";
import { Priority } from "../entities/task.entity";
import { Auth } from "src/auth/entities/auth.entity";
import { CreateAuthInput } from "src/auth/dto/create-auth.input";

@InputType()
export class CreateTaskInput {

  @Field(() => String)
  creator: string;
  
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  
  @Field(() => Priority)
  properity: Priority;


  @Field(() => [CreateAuthInput], { nullable: true })
  Auths?: CreateAuthInput[];

  @Field(() => [String] , { nullable:true})
  notes: string[];


}