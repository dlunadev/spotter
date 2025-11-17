import { UserRepository } from "../../domain/auth/user.repository";

export class AuthServices {
  constructor(private repo: UserRepository) { }

  async sign_in_google() {
    return await this.repo.sign_in_google();
  }

  async get_current_session() {
    return await this.repo.get_current_session();
  }
}