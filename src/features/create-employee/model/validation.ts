import type { CreateEmployeeFormValues } from "./types";
import {
  emailSchema,
  phoneSchema,
  fullNameSchema,
  positionSchema,
  requiredStringSchema,
  birthdaySchema,
} from "@/shared/lib/validation";

export type ValidationErrors = Partial<
  Record<keyof CreateEmployeeFormValues, string>
> & {
  general?: string;
};

export const validateEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success;
};

export const validatePhone = (phone: string): boolean => {
  return phoneSchema.safeParse(phone).success;
};

export const validateForm = (
  values: CreateEmployeeFormValues,
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const fullNameResult = fullNameSchema.safeParse(values.fullName);
  if (!fullNameResult.success) {
    errors.fullName =
      fullNameResult.error.issues[0]?.message || "Обязательное поле";
  }

  const positionResult = positionSchema.safeParse(values.position);
  if (!positionResult.success) {
    errors.position =
      positionResult.error.issues[0]?.message || "Обязательное поле";
  }

  const departmentResult = requiredStringSchema.safeParse(values.department);
  if (!departmentResult.success) {
    errors.department =
      departmentResult.error.issues[0]?.message || "Обязательное поле";
  }

  const emailCorporateResult = emailSchema.safeParse(values.emailCorporate);
  if (!emailCorporateResult.success) {
    errors.emailCorporate =
      emailCorporateResult.error.issues[0]?.message || "Некорректный email";
  }

  const phoneCorporateResult = phoneSchema.safeParse(values.phoneCorporate);
  if (!phoneCorporateResult.success) {
    errors.phoneCorporate =
      phoneCorporateResult.error.issues[0]?.message || "Некорректный телефон";
  }

  const birthdayResult = birthdaySchema.safeParse(values.birthday);
  if (!birthdayResult.success) {
    errors.birthday =
      birthdayResult.error.issues[0]?.message || "Обязательное поле";
  }

  const cityResult = requiredStringSchema.safeParse(values.city);
  if (!cityResult.success) {
    errors.city = cityResult.error.issues[0]?.message || "Обязательное поле";
  }

  if (values.emailPersonal) {
    const emailPersonalResult = emailSchema.safeParse(values.emailPersonal);
    if (!emailPersonalResult.success) {
      errors.emailPersonal = "Некорректный email";
    }
  }

  if (values.phonePersonal) {
    const phonePersonalResult = phoneSchema.safeParse(values.phonePersonal);
    if (!phonePersonalResult.success) {
      errors.phonePersonal = "Некорректный телефон";
    }
  }

  return errors;
};
