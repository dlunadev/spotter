import React from "react";
import { ButtonGradient, Text, Wrapper } from "@/components";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/auth.context";

export default function TabTwoScreen() {
  const { logout, user } = useAuth();

  return (
    <Wrapper>
      <Text>{user?.email}</Text>
      <ButtonGradient onPress={async () => logout()}>Logout</ButtonGradient>
    </Wrapper>
  );
}
