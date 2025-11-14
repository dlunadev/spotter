import { Href, RelativePathString } from "expo-router";

export enum AuthRoutes {
  SIGN_IN = "sign-in/index",
  SIGN_UP = "sign-up/index",
  RECOVERY_PASSWORD = "password/recovery-password/index",
  SEND_CODE = "password/code/index",
  RESET_PASSWORD = "password/reset-password/index",
  SUCESS = "password/success/index",
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

// Tabs Routes

export enum TabsRoutes {
  HOME = 'home/index'
}

export const TabsRoutesLink = {
  HOME: "/(tabs)/home/" as Href
}

export type TabsRoutesLink = typeof TabsRoutesLink[keyof typeof TabsRoutesLink]

// Home Routes

export enum HomeRoutes {
  HOME = "index",
  SPOT = "[id]/index",
}

export const HomeRoutesLink = {
  SPOT: "/(home)/[id]/" as RelativePathString
}

export type HomeRoutesLink = typeof HomeRoutesLink[keyof typeof HomeRoutesLink]