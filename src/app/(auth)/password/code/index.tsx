import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ButtonGradient, Hero, Text, VStack } from "@/components";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Wrapper } from "@/components";
import { useTranslation } from "react-i18next";
import { AuthRoutesLink } from "@/utils/enum/routes";
import { useTimer } from "@/hooks";
import OTPInput from "@/components/atom/otp/otp.component";

export default function Code() {
  const { t } = useTranslation("auth_code");

  const [showTimer, setShowTimer] = useState(false);
  const { formattedTime, reset, start, stop } = useTimer(120);
  const [isCodeSent, setIsCodeSent] = useState(false);

  useEffect(() => {
    if (showTimer) {
      start();
      setIsCodeSent(true);
    }
  }, [showTimer]);

  useEffect(() => {
    if (formattedTime === "00:00") {
      setShowTimer(false);
      setIsCodeSent(false);
      reset();
      stop();
    }
  }, [formattedTime]);

  return (
    <KeyboardAwareScrollView
      className="grow"
      contentContainerClassName="flex-1"
      bottomOffset={120}
      showsVerticalScrollIndicator={false}
    >
      <Hero
        title={t("title")}
        subtitle={t("subtitle")}
        route_to={t("route_to")}
        redirect_to={() => router.push(AuthRoutesLink.SIGN_IN)}
      />

      <Wrapper className="flex-1">
        <VStack className="gap-2 mb-2">
          <Text size={16}>{t("check_email")}</Text>
        </VStack>

        <View className="flex-1 items-center">
          <OTPInput value={""} onCodeChange={() => {}} />
        </View>

        <VStack className="gap-4">
          <ButtonGradient
            onPress={() => {
              router.push(AuthRoutesLink.RESET_PASSWORD);
            }}
          >
            {t("verify_button")}
          </ButtonGradient>

          <Text align="center">
            {t("resend_question")}{" "}
            {showTimer ? (
              <Text size={14} weight={500} color={Colors.BLACK}>
                {formattedTime}
              </Text>
            ) : (
              <Text weight={600} onPress={() => setShowTimer(true)}>
                {t("resend_action")}
              </Text>
            )}
          </Text>
        </VStack>
      </Wrapper>
    </KeyboardAwareScrollView>
  );
}
