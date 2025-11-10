import { TFunction } from "i18next";
import { z } from "zod";

export const SignUpSchema = (t: TFunction<"auth_signup", undefined>) =>
  z.object({
    firstName: z
      .string()
      .min(2, t("form.first_name.error_min_length"))
      .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, t("form.first_name.error_regexp")),
    lastName: z
      .string()
      .min(2, t("form.last_name.error_min_length"))
      .regex(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, t("form.last_name.error_regexp")),

    email: z
      .string()
      .email(t("form.email.error_email"))
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .min(6, t("form.phone.error_min_length"))
      .regex(/^\d+$/, t("form.phone.error_regexp"))
      .optional()
      .or(z.literal("")),

    birthDate: z
      .string()
      .regex(/^\d{2}-\d{2}-\d{4}$/, t("form.birth_date.error_regexp"))
      .refine((dateStr) => {
        const [day, month, year] = dateStr.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        );
      }, t("form.birth_date.error_undefined_date"))
      .refine((dateStr) => {
        const [day, month, year] = dateStr.split("-").map(Number);
        const birth = new Date(year, month - 1, day);
        const today = new Date();
        const minDate = new Date(
          today.getFullYear() - 16,
          today.getMonth(),
          today.getDate()
        );
        return birth <= minDate;
      }, t("form.birth_date.error_min_age")),

    password: z
      .string()
      .min(6, t("form.password.error_min_length"))
      .regex(/[A-Z]/, t("form.password.error_regexp"))
      .regex(/[0-9]/, t("form.password.error_second_regexp")),
  }).superRefine((data, ctx) => {
    if (!data.email && !data.phone) {
      ctx.addIssue({
        path: ["email"],
        message: t("form.email.error_email"),
        code: z.ZodIssueCode.custom,
      });
      ctx.addIssue({
        path: ["phone"],
        message: t("form.phone.error_min_length"),
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type sign_up_data_schema = z.infer<ReturnType<typeof SignUpSchema>>;
