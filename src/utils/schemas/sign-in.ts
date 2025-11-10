import { TFunction } from "i18next";
import { z } from "zod";

export const SignInSchema = (t: TFunction<"auth_signin", undefined>) =>
  z.object({
    email: z.string().nonempty(t('form.email.error_required')).email(t("form.email.error_email")),
    password: z.string({
      error: t('form.password.error_required')
    }).nonempty(t("form.password.error_required"))
  });

export type sign_in_data_schema = z.infer<ReturnType<typeof SignInSchema>>;
