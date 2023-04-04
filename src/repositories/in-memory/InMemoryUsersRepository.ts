import { randomUUID } from "node:crypto";
import { hash } from "bcryptjs";
import { CreateUserInput } from "../../dtos/inputs/CreateUserInput";
import { UserType } from "../../modules/users/UserType";
import { UsersRepository } from "../UsersRepository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: UserType[] = [];

  async create(data: CreateUserInput): Promise<UserType> {
    const user: UserType = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      secret_password: await hash(data.password, 8),
      createdAt: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findById(user_id: string): Promise<UserType | null> {
    const user = this.users.find((user) => user.id === user_id);

    if (!user) {
      return null;
    }

    return user;
  }
}
