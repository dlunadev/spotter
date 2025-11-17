import { User } from "./user.entity";

export interface UserRepository {
  sign_in_google(): Promise<void>
  sign_in_facebook(): Promise<User>;
  get_current_session(): Promise<User | null>;
}