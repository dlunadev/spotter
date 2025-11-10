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
import { useTranslation } from "react-i18next";
import SignInForm from "@/components/organism/form/sign-in.form";
import { AuthRoutesLink } from "@/utils/enum/routes";

export default function SignIn() {
  const { top } = useInsets();
  const { t } = useTranslation("auth_signin");
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

        <View className="flex-1 justify-end pb-6">
          <View className="px-6 py-4 gap-2">
            <Text size={32} color={Colors.WHITE}>
              {t("title")}
            </Text>
            <Text size={14} color={Colors.WHITE}>
              {t("sub_title")} {" "}
              <Text color={Colors.BLUE} underline onPress={() => router.push(AuthRoutesLink.SIGN_UP)}>
                {t("sign_up")}
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
      <Wrapper className="flex-1">
        <SignInForm />
      </Wrapper>
    </KeyboardAwareScrollView>
  );
}
