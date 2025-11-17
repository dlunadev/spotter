import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { router } from "expo-router";
import { Wrapper } from "@/components/";
import { useTranslation } from "react-i18next";
import SignInForm from "@/components/organism/form/sign-in.form";
import { AuthRoutesLink } from "@/utils/enum/routes";
import { Hero } from "@/components";
import { useAuth } from "@/context/auth.context";

export default function SignIn() {
  const { user } = useAuth();
  const { t } = useTranslation("auth_signin");

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
        route_to={t("sign_up")}
        redirect_to={() => router.push(AuthRoutesLink.SIGN_UP)}
        arrow={false}
      />
      <Wrapper className="flex-1">
        <SignInForm />
      </Wrapper>
    </KeyboardAwareScrollView>
  );
}
