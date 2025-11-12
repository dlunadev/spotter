import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { router } from "expo-router";
import { Wrapper } from "@/components/";
import RegisterForm from "@/components/organism/form/sign-up.form";
import { useTranslation } from "react-i18next";
import { AuthRoutesLink } from "@/utils/enum/routes";
import { Hero } from "@/components";

export default function SignUp() {
  const { t } = useTranslation("auth_signup");

  return (
    <KeyboardAwareScrollView
      className="flex-1"
      contentContainerClassName="grow"
      bottomOffset={120}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <Hero
        title={t("title")}
        subtitle={t("sub_title")}
        route_to={t("log_in")}
        redirect_to={() => router.push(AuthRoutesLink.SIGN_IN)}
      />

      <Wrapper className="flex-1">
        <RegisterForm />
      </Wrapper>
    </KeyboardAwareScrollView>
  );
}
