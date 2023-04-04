import { CreateUserInput } from "../dtos/inputs/CreateUserInput";
import { UserType } from "../modules/users/UserType";

export interface UsersRepository {
  create(data: CreateUserInput): Promise<UserType>;
  findById(user_id: string): Promise<UserType | null>;
}
