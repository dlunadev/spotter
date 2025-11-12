import { Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useInsets } from "@/hooks";
import { ButtonGradient, Hero, Input, Text, VStack, Wrapper } from "@/components";
import { Check, Cross } from "@/assets/svg";
import { messages } from "@/helpers/password-validate";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { AuthRoutesLink } from "@/utils/enum/routes";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const validatePassword = (password: string) => {
  return {
    isLengthValid: password.length >= 8 && password.length <= 20,
    hasLowerCase: /[a-z]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

export default function ResetPassword() {
  const { bottom } = useInsets();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const validations = validatePassword(password);
  const isPasswordEqual = password === confirmPassword;

  return (
    <KeyboardAwareScrollView
      className="flex-1"
      contentContainerClassName="grow"
      bottomOffset={120}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      <Hero
        title="Restablecer contraseña"
        subtitle="Ya tenes cuenta? Entonces"
        route_to="Inicia sesion pelotudo"
        redirect_to={() => router.push(AuthRoutesLink.SIGN_IN)}
      />

      <Wrapper>
        <VStack className="gap-3 items-center">
          <Text align="center">
            Asegúrate de elegir una contraseña segura y fácil de recordar.
          </Text>
        </VStack>

        <View className="mt-8 gap-4 pb-8">
          <Input
            label="Contraseña"
            onBlur={() => {}}
            onChangeText={setPassword}
            placeholder=""
            secureTextEntry={true}
            rightIcon
          />
          <Input
            label="Confirmar contraseña"
            onBlur={() => {}}
            onChangeText={setConfirmPassword}
            placeholder=""
            secureTextEntry={true}
            rightIcon
          />
          <View>
            {Object.entries(validations).map(([key, isValid]) => (
              <View key={key} className="flex-row items-center gap-2">
                {isValid === null ? (
                  <Text className="text-gray-500">●</Text>
                ) : isValid ? (
                  <Check width={16} height={16} color={Colors.BLACK} />
                ) : (
                  <Cross width={16} height={16} color={Colors.BLACK} />
                )}

                <Text style={[styles.text]} weight={300}>
                  {messages[key as keyof typeof messages]}
                </Text>
              </View>
            ))}

            <View className="flex-row items-center gap-2">
              {isPasswordEqual === null ? (
                <Text className="text-gray-500">●</Text>
              ) : isPasswordEqual ? (
                <Check width={16} height={16} color={Colors.BLACK} />
              ) : (
                <Cross width={16} height={16} color={Colors.BLACK} />
              )}

              <Text style={[styles.text]} weight={300}>
                {messages.passwordEqual}
              </Text>
            </View>
          </View>
          <View style={{ paddingBottom: bottom }} className="gap-4 mt-8">
            <ButtonGradient
              onPress={() => {
                router.dismissAll();
                router.push(AuthRoutesLink.SUCESS);
              }}
              stretch
            >
              Reestablecer Contraseña
            </ButtonGradient>
          </View>
        </View>
      </Wrapper>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginVertical: 2,
  },
});
