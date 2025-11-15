import {
  View,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
  ButtonGradient,
  Hero,
  Input,
  Modal,
  ModalBackdrop,
  PhoneNumber,
  Text,
} from "@/components";
import { Email, Phone } from "@/assets/svg";
import { Colors } from "@/constants/Colors";
import { useInsets } from "@/hooks";
import { router } from "expo-router";
import { Wrapper } from "@/components";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { CountryCode } from "libphonenumber-js";
import { PhoneUtils } from "@/utils/phone.util";
import { AuthRoutesLink } from "@/utils/enum/routes";
import {
  form_schema,
  recovery_data_schema,
} from "@/utils/schemas/recovery-password";

export default function RecoveryPassword() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("auth_recovery_password");
  const { bottom } = useInsets();
  const [usePhone, setUsePhone] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [countryCode, setCountryCode] = useState<{
    id: string;
    code: CountryCode;
  }>({
    id: "+54",
    code: "AR",
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<recovery_data_schema>({
    resolver: zodResolver(form_schema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const { email, phone } = getValues();

  const onSubmit = (data: recovery_data_schema) => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setModalVisible(false);
      router.push(AuthRoutesLink.SEND_CODE);
    }, 3500);
    setLoading(false);
  };

  return (
    <>
      <KeyboardAwareScrollView
        className="flex-1"
        contentContainerClassName="grow"
        showsVerticalScrollIndicator={false}
      >
        <Hero title={t("title")} subtitle={t("subtitle")} />

        <Wrapper className="flex-1">
          <View className="gap-4 mt-6">
            {usePhone ? (
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
                        const validated = PhoneUtils.validate(
                          `${countryCode.id}${value}` || "",
                          countryCode.code
                        );

                        if (!validated) {
                          setError("phone", {
                            message: "Invalid phone number",
                          });
                        }

                        if (formatted)
                          setValue("phone", formatted, {
                            shouldValidate: true,
                          });
                      }}
                      phoneNumber={countryCode}
                    />
                  )}
                />
                <Text size={12} color={Colors.GRAY}>
                  {t("phone_verification_info")}
                </Text>
              </>
            ) : (
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.email?.message}
                  />
                )}
              />
            )}

            <Pressable
              onPress={() => setUsePhone((prev) => !prev)}
              className="flex-row items-center mt-2"
            >
              {usePhone ? (
                <Email color="#1D61E7" width={18} height={18} />
              ) : (
                <Phone color="#1D61E7" width={18} height={18} />
              )}
              <Text size={12} color="#1D61E7" className="ml-2">
                {usePhone ? t("form.use_email") : t("form.use_phone")}
              </Text>
            </Pressable>

            <Text size={12} color="#888" className="mt-1">
              {t("having_problems")}
            </Text>
          </View>
        </Wrapper>
        <View className="bg-white px-6" style={{ paddingBottom: bottom + 12 }}>
          <ButtonGradient onPress={handleSubmit(onSubmit)}>
            {t("button_continue")}
          </ButtonGradient>
        </View>
      </KeyboardAwareScrollView>

      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        useRNModal
        closeOnOverlayClick
      >
        <ModalBackdrop></ModalBackdrop>
        <View className="bg-white rounded-2xl w-[80%] p-6">
          <Text size={20} color={Colors.BLACK} className="font-semibold mb-2">
            {usePhone ? "Confirm your number" : "Confirm your email"}
          </Text>
          <Text size={14} color={Colors.BLACK} className="mb-6">
            {t("modal_text_before_value")}{" "}
          </Text>
          <Text size={14} color={Colors.PRIMARY}>
            {usePhone ? `${countryCode.id} ${phone}` : email}
          </Text>

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="flex-1 mr-2 border border-gray-300 rounded-xl py-3 items-center"
            >
              <Text size={14} color={Colors.BLACK}>
                {t("cancel")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleConfirm}
              className="flex-1 ml-2 bg-[#1D61E7] rounded-xl py-3 items-center"
            >
              {loading ? (
                <ActivityIndicator color={Colors.WHITE} />
              ) : (
                <Text size={14} color={Colors.WHITE}>
                  {t("confirm")}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
