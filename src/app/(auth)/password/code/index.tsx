import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ButtonGradient, Hero, Input, Text, VStack } from "@/components";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Wrapper } from "@/components";
import { useTranslation } from "react-i18next";
import { AuthRoutesLink } from "@/utils/enum/routes";
import { useTimer } from "@/hooks";

export default function Code() {
  const [showTimer, setShowTimer] = useState(false);

  const { t } = useTranslation("auth_signup");
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
        title="Pone el codigo amiguito"
        subtitle="Ya tenes cuenta? Entonces"
        route_to="Inicia sesion pelotudo"
        redirect_to={() => router.push(AuthRoutesLink.SIGN_IN)}
      />

      <Wrapper className="flex-1">
        <VStack className="gap-2 mb-2">
          <Text size={16}>Por favor, revise su email.</Text>
        </VStack>
        <View className="flex-1">
          <Input />
        </View>
        {/* <OTPInput value={otp} onCodeChange={setOtp} /> */}
        <VStack className="gap-4">
          <ButtonGradient
            onPress={() => {
              // handleVerifyOTP();
              console.log("push push push");
              router.push(AuthRoutesLink.RESET_PASSWORD);
            }}
          >
            Verificar código
          </ButtonGradient>
          <Text align="center">
            Aun no te llego el codigo?{" "}
            {showTimer ? (
              <Text size={14} weight={300} color={Colors.BLACK}>
                <Text size={14} weight={500} color={Colors.BLACK}>
                  {formattedTime}
                </Text>
              </Text>
            ) : (
              <Text weight={600} onPress={() => setShowTimer(true)}>
                Reenviar código
              </Text>
            )}
          </Text>
        </VStack>
      </Wrapper>
    </KeyboardAwareScrollView>
  );
}
