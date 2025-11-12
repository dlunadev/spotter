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
import { Hero } from "@/components";

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
      <Hero title={t("title")} subtitle={t("sub_title")} route_to={t("sign_up")} redirect_to={() => router.push(AuthRoutesLink.SIGN_UP)} />
      <Wrapper className="flex-1">
        <SignInForm />
      </Wrapper>
    </KeyboardAwareScrollView>
  );
}
