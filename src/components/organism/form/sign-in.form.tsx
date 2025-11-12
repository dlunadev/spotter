import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Input } from "@/components/atom/input/input.component";
import { Facebook, Google } from "@/assets/svg";
import { Colors } from "@/constants/Colors";
import {
  Button,
  ButtonGradient,
} from "@/components/atom/button/button.component";
import { sign_up_data_schema, SignUpSchema } from "@/utils/schemas/sign-up";
import { ButtonSpinner } from "@/components/ui/button";
import { Keyboard, View } from "react-native";
import { Trans, useTranslation } from "react-i18next";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
} from "@/components/ui/checkbox";
import { Text } from "@/components/atom/text/text.component";
import { CheckIcon } from "@/components/ui/icon";
import { sign_in_data_schema, SignInSchema } from "@/utils/schemas/sign-in";
import { router } from "expo-router";
import { AuthRoutesLink } from "@/utils/enum/routes";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("auth_signin");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<sign_in_data_schema>({
    resolver: zodResolver(SignInSchema(t)),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: sign_in_data_schema) => {
    Keyboard.dismiss();
    setIsLoading(true);
    console.log("⏳ Enviando datos...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("✅ Datos válidos:", data);
    setIsLoading(false);
  };

  return (
    <VStack className="flex-1">
      <VStack className="mb-8 gap-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label={t("form.email.label")}
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label={t("form.password.label")}
              secureTextEntry
              rightIcon
              value={value}
              onChangeText={onChange}
              error={errors.password?.message}
            />
          )}
        />

        <HStack className="justify-between items-center">
          <Checkbox value="">
            <CheckboxIndicator>
              <CheckboxIcon as={CheckIcon} />
            </CheckboxIndicator>
            <Text size={12} color={Colors.GRAY}>
              {t("remember_me")}
            </Text>
          </Checkbox>
          <Text color={Colors.BLUE} size={12} weight={600} onPress={() => router.push(AuthRoutesLink.RECOVERY_PASSWORD)}>
            {t("forgot_password")}
          </Text>
        </HStack>
      </VStack>

      <ButtonGradient onPress={handleSubmit(onSubmit)} disabled={isLoading}>
        {isLoading ? <ButtonSpinner color={Colors.WHITE} /> : t("form.submit")}
      </ButtonGradient>

      <View className="flex-row items-center justify-center my-4 mt-7">
        <View className="flex-1 bg-[#EDF1F3] h-[1px]" />
        <Text size={12} color={Colors.GRAY} className="mx-4">
          {t("or")}
        </Text>
        <View className="flex-1 bg-[#EDF1F3] h-[1px]" />
      </View>

      <HStack className="gap-4 w-full">
        <Button onPress={() => {}} stretch outlined left_icon icon={<Google />}>
          Google
        </Button>
        <Button
          onPress={() => {}}
          stretch
          outlined
          left_icon
          icon={<Facebook />}
        >
          Facebook
        </Button>
      </HStack>

      <View className="grow-1 flex-1 justify-end">
        <Text color={Colors.GRAY} size={12} align="center">
          <Trans
            i18nKey="terms"
            ns="auth_signin"
            components={{
              bold: <Text weight={600} color={Colors.BLACK} size={12} />,
            }}
          />
        </Text>
      </View>
    </VStack>
  );
}
