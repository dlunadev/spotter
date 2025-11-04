import { View, Dimensions } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button, HStack, Text, VStack } from "@/components";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { AuthRoutesLink } from "@/utils/enum/routes";

const { height } = Dimensions.get("screen");

const social_media = [
  {
    name: "google",
    color: "#DB4437",
  },
  {
    name: "facebook",
    color: "#4267B2",
  },
  {
    name: "apple",
    color: "#000",
  },
];

export default function SignIn() {
  const panel_height = height / 3;

  return (
    <VStack className="flex-1">
      <View className="w-full h-full bg-[#333] absolute" />

      <View className="flex-1 items-left justify-end px-4" style={{ marginBottom: panel_height + 18 }}>
        <Text color={Colors.WHITE} size={24}>Contenido principal</Text>
        <Text color={Colors.WHITE} size={16}>Subtexto</Text>
      </View>
      <View
        className="absolute bottom-0 w-full h-2/6 p-4 pt-10 gap-2 bg-white items-center"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <VStack className="gap-2 w-full">
          <Button onPress={() => router.push(AuthRoutesLink.SIGN_UP)}>Registrarse</Button>
          <Button onPress={() => {}} outlined>
            Iniciar Sesión
          </Button>
        </VStack>

        <View className="flex-row items-center justify-center w-[90%] my-4">
          <View className="flex-1 bg-[#ccc] h-[1px]" />
          <Text className="mx-4 text-[#888] font-semibold">O</Text>
          <View className="flex-1 bg-[#ccc] h-[1px]" />
        </View>

        <HStack className="gap-2">
          {social_media.map((media) => (
            <View
              className="w-[40px] h-[40px] rounded-full p-2 border border-black items-center justify-center"
              key={media.name}
            >
              <FontAwesome
                name={media.name as any}
                size={20}
                color={media.color}
              />
            </View>
          ))}
        </HStack>
      </View>
    </VStack>
  );
}
