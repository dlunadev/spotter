import { Href } from "expo-router";

export enum AuthRoutes {
  SIGN_IN = "sign-in/index",
  SIGN_UP = "sign-up/index",
  RECOVERY_PASSWORD = "password/recovery-password/index",
  SEND_CODE = "password/code/index",
  RESET_PASSWORD = "reset-password",
  SUCESS = "password-success",
}

export const AuthRoutesLink = {
  SIGN_IN: "/(auth)/sign-in" as Href,
  SIGN_UP: "/(auth)/sign-up" as Href,
  RECOVERY_PASSWORD: "/(auth)/password/recovery-password" as Href,
  SEND_CODE: "/(auth)/password/code" as Href,
  RESET_PASSWORD: "/(auth)/password/reset-password" as Href,
  SUCESS: "/(auth)/password/success" as Href,
} as const;

export type AuthRoutesLink = typeof AuthRoutesLink[keyof typeof AuthRoutesLink];
