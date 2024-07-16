import { Field, InputType } from "@nestjs/graphql";
import { Priority } from "../entities/task.entity";
import { Auth } from "src/auth/entities/auth.entity";
import { CreateAuthInput } from "src/auth/dto/create-auth.input";

@InputType()
export class UpdateTaskInput  {
 
  @Field(() => String,{ nullable: true })
  name?: string;

  @Field(() => String,{ nullable: true })
  description?: string;

  
  @Field(() => Priority,{ nullable: true })
  properity?: Priority;


  @Field(() => [CreateAuthInput], { nullable: true })
  Auths?: CreateAuthInput[];

  @Field(() => [String] , { nullable:true})
  notes: string[];

}
