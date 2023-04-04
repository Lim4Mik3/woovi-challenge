import { InputType, Field } from "type-graphql";
import { IsEmail } from "class-validator";

@InputType({ description: "Required data to create a new user" })
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  @IsEmail({}, { message: "A valid e-mail address is required" })
  email: string;

  @Field(() => String)
  password: string;
}
