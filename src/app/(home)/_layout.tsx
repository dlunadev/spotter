import { StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { HomeRoutes } from "@/utils/enum/routes";

export default function HomeLayout() {
  return (
    <>
      <StatusBar animated barStyle="dark-content" translucent />
      <Stack>
        <Stack.Screen name={HomeRoutes.SPOT} />
      </Stack>
    </>
  );
}
