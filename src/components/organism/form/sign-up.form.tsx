import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Input } from "@/components/atom/input/input.component";
import { Calendar } from "@/assets/svg";
import { Colors } from "@/constants/Colors";
import { PhoneNumber } from "@/components/molecules/phone-number/phone-number.component";
import { ButtonGradient } from "@/components/atom/button/button.component";
import { date_formatter } from "@/helpers/birth-date-formatter";
import { sign_up_data_schema, SignUpSchema } from "@/utils/schemas/sign-up";
import { ButtonSpinner } from "@/components/ui/button";
import { Keyboard } from "react-native";
import { useTranslation } from "react-i18next";
import { Text } from "@/components/atom/text/text.component";
import { PhoneUtils } from "@/utils/phone.util";
import { CountryCode } from "libphonenumber-js";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [useEmail, setUseEmail] = useState(false);
  const [countryCode, setCountryCode] = useState<{
    id: string;
    code: CountryCode;
  }>({
    id: "+54",
    code: "AR",
  });

  const { t } = useTranslation("auth_signup");
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<sign_up_data_schema>({
    resolver: zodResolver(SignUpSchema(t)),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: sign_up_data_schema) => {
    Keyboard.dismiss();
    setIsLoading(true);
    console.log("⏳ Enviando datos...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("✅ Datos válidos:", data);
    setIsLoading(false);
  };

  return (
    <VStack className="gap-4 mb-8">
      <HStack className="gap-4">
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <Input
              label={t("form.first_name.label")}
              stretch
              value={value}
              onChangeText={onChange}
              error={errors.firstName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <Input
              label={t("form.last_name.label")}
              stretch
              value={value}
              onChangeText={onChange}
              error={errors.lastName?.message}
            />
          )}
        />
      </HStack>

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

      <Input
        label={t("form.birth_date.label")}
        customIcon={
          <Calendar
            color={
              control._formState.errors.birthDate
                ? Colors.PRIMARY
                : Colors.TERTIARY
            }
          />
        }
        rightIcon
        placeholder="DD-MM-YYYY"
        value={control._formValues.birthDate}
        error={errors.birthDate?.message}
        onChangeText={(text) => {
          const formatted = date_formatter(text);
          setValue("birthDate", formatted, { shouldValidate: true });
        }}
        keyboardType="number-pad"
      />

      {useEmail ? (
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
      ) : (
        <>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <PhoneNumber
                label={t("form.phone.label")}
                handleChangeCode={setCountryCode}
                onChangeText={onChange}
                value={value}
                error={errors.phone?.message}
                onBlur={() => {
                  const formatted = PhoneUtils.format(
                    value || "",
                    countryCode.code
                  );
                  if (formatted)
                    setValue("phone", formatted, { shouldValidate: true });
                }}
                phoneNumber={countryCode}
              />
            )}
          />
        </>
      )}

      <Text
        onPress={() => setUseEmail((prev) => !prev)}
        color={Colors.BLUE}
        size={12}
      >
        {useEmail ? t("form.use_phone") : t("form.use_email")}
      </Text>

      {!useEmail && (
        <Text size={12} color={Colors.GRAY}>
          {t("form.phone.terms")}
        </Text>
      )}

      <ButtonGradient onPress={handleSubmit(onSubmit)} disabled={isLoading}>
        {isLoading ? <ButtonSpinner color={Colors.WHITE} /> : t("form.submit")}
      </ButtonGradient>
    </VStack>
  );
}
