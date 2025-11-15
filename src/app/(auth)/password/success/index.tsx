import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { ButtonGradient, Text, VStack } from "@/components";
import { AuthRoutesLink } from "@/utils/enum/routes";
import { Stars } from "@/assets/svg";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";

export default function PasswordSuccess() {
  const { t } = useTranslation("auth_success");

  return (
    <LinearGradient
      colors={["#2A6DE8", "#FFFFFF"] as const}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <VStack className="justify-center flex-1 gap-4 p-6">
        <View className="gap-3 items-center mb-8">
          <Stars color={Colors.LIGHT_GRAY} />
          <Text size={32} weight={600} align="center">
            {t("title")}
          </Text>
          <Text weight={400}>{t("description")}</Text>
        </View>
        <ButtonGradient
          onPress={() => {
            router.dismissAll();
            router.replace(AuthRoutesLink.SIGN_IN);
          }}
        >
          {t("button_back")}
        </ButtonGradient>
      </VStack>
    </LinearGradient>
  );
}
