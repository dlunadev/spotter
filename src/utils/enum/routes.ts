import { Href } from "expo-router";

export enum AuthRoutes {
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up",
  RECOVERY_PASSWORD = "recovery-password",
  SEND_CODE = "send-code",
  RESET_PASSWORD = "reset-password",
  PASSWORD_SUCCESS = "password-success",
  ADDITIONAL_INFO = "additional-info",
  MAP = "map"
}

export const AuthRoutesLink = {
  SIGN_IN: "/(auth)/sign-in" as Href,
  SIGN_UP: "/(auth)/sign-up" as Href,
  RECOVERY_PASSWORD: "/(auth)/recovery-password" as Href,
  SEND_CODE: "/(auth)/send-code" as Href,
  RESET_PASSWORD: "/(auth)/reset-password" as Href,
  PASSWORD_SUCCESS: "/(auth)/password-success" as Href,
  ADDITIONAL_INFO: "/(auth)/additional-info" as Href,
  MAP: "/(auth)/map" as Href,
} as const;

export type AuthRoutesLink = typeof AuthRoutesLink[keyof typeof AuthRoutesLink];
