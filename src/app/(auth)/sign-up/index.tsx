import { View, ImageBackground } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Fab, Text } from "@/components";
import { ArrowNarrowLeft } from "@/assets/svg";
import { Colors } from "@/constants/Colors";
import { useDimensions, useInsets } from "@/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Wrapper } from "@/components/";
import RegisterForm from "@/components/organism/form/sign-up.form";
import { useTranslation } from "react-i18next";
import { AuthRoutesLink } from "@/utils/enum/routes";

export default function SignUp() {
  const { top } = useInsets();
  const { t } = useTranslation("auth_signup");
  const { screen_dimensions } = useDimensions();

  const { height } = screen_dimensions;

  return (
    <KeyboardAwareScrollView
      className="flex-1"
      contentContainerClassName="grow"
      bottomOffset={120}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <ImageBackground
        source={require("@/assets/images/background.png")}
        resizeMode="cover"
        className="bg-[#0D0D1B] w-full"
        style={{ paddingTop: top, height: height / 3 }}
      >
        <LinearGradient
          colors={["rgba(255,255,255,0.15)", "rgba(255,255,255,0)"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
          className="absolute inset-0"
        />

        <View className="flex-1 justify-between pb-6">
          <View className="mt-4">
            <Fab
              placement="top left"
              className="bg-transparent active:bg-transparent"
              onPress={() => router.back()}
            >
              <ArrowNarrowLeft width={32} height={32} />
            </Fab>
          </View>

          <View className="px-6 py-4 gap-2">
            <Text size={28} color={Colors.WHITE}>
              {t("title")}
            </Text>
            <Text size={14} color={Colors.WHITE}>
              {t("sub_title")}{" "}
              <Text color={Colors.BLUE} underline onPress={() => router.push(AuthRoutesLink.SIGN_IN)}>
                {t("log_in")}
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
      <Wrapper className="flex-1">
        <RegisterForm />
      </Wrapper>
    </KeyboardAwareScrollView>
  );
}
