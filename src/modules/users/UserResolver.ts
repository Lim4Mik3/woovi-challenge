import { Resolver, Arg, Mutation, Query } from "type-graphql";
import { CreateUserInput } from "../../dtos/inputs/CreateUserInput";
import { UserType } from "./UserType";
import { UsersRepository } from "../../repositories/UsersRepository";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";

@Resolver(UserType)
export class UsersResolver {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new InMemoryUsersRepository();
  }

  @Query(() => UserType, {
    description: "Get a specific User gaven a ID",
  })
  async getUser(@Arg("user_id", () => String) user_id: string) {
    const user = await this.usersRepository.findById(user_id);

    return user;
  }

  @Mutation(() => UserType)
  async createUser(
    @Arg("data", () => CreateUserInput) data: CreateUserInput
  ): Promise<UserType> {
    const createdUser = await this.usersRepository.create({
      email: data.email,
      name: data.name,
      password: data.password,
    });

    return createdUser;
  }
}
