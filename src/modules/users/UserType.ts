import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class UserType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  secret_password: string;

  @Field(() => Date)
  createdAt: Date;
}
