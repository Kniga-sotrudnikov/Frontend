import type { CreateEmployeeFormValues } from "./types";

export type ValidationErrors = Partial<Record<keyof CreateEmployeeFormValues, string>> & {
  general?: string;
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Проверка на допустимые символы: цифры, пробелы, +, (, ), -
  if (!/^[\d\s+()-]+$/.test(phone)) return false;
  // Проверка количества цифр (без учета форматирования)
  const digits = phone.replace(/[\s()-]/g, '');
  return digits.length >= 10 && digits.length <= 15;
};

export const validateForm = (values: CreateEmployeeFormValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Обязательные поля
  if (!values.fullName.trim()) {
    errors.fullName = "Обязательное поле";
  }
  if (!values.position.trim()) {
    errors.position = "Обязательное поле";
  }
  if (!values.department) {
    errors.department = "Обязательное поле";
  }
  if (!values.emailCorporate.trim()) {
    errors.emailCorporate = "Обязательное поле";
  } else if (!validateEmail(values.emailCorporate)) {
    errors.emailCorporate = "Некорректный email";
  }
  if (!values.phoneCorporate.trim()) {
    errors.phoneCorporate = "Обязательное поле";
  } else if (!validatePhone(values.phoneCorporate)) {
    errors.phoneCorporate = "Некорректный телефон";
  }
  if (!values.birthday) {
    errors.birthday = "Обязательное поле";
  }
  if (!values.city) {
    errors.city = "Обязательное поле";
  }

  // Необязательные поля (проверяем только если заполнены)
  if (values.emailPersonal.trim() && !validateEmail(values.emailPersonal)) {
    errors.emailPersonal = "Некорректный email";
  }
  if (values.phonePersonal.trim() && !validatePhone(values.phonePersonal)) {
    errors.phonePersonal = "Некорректный телефон";
  }

  return errors;
};