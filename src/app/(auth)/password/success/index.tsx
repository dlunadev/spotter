import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { ButtonGradient, Text, VStack } from "@/components";
import { AuthRoutesLink } from "@/utils/enum/routes";
import { Stars } from "@/assets/svg";
import { LinearGradient } from "expo-linear-gradient";

export default function PasswordSuccess() {
  return (
    <LinearGradient
      colors={["#1D61E7", "#12B8FF"] as const}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 0.9, y: 0.5 }}
      className="flex-1"
    >
      <VStack className="justify-center flex-1 gap-4 p-6">
        <View className="gap-3 items-center mb-8">
          <Stars color="#1D61E7" />
          <Text size={32} weight={600} align="center">
            ¡Contraseña reestablecida con éxito!
          </Text>
          <Text weight={400}>
            Tu contraseña se ha actualizado correctamente.
          </Text>
        </View>
        <ButtonGradient
          onPress={() => {
            router.dismissAll();
            router.replace(AuthRoutesLink.SIGN_IN);
          }}
        >
          Volver al inicio
        </ButtonGradient>
      </VStack>
    </LinearGradient>
  );
}
