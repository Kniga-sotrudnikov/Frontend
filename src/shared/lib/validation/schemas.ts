import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, "Введите email")
  .email("Введите корректный email");

export const passwordSchema = z
  .string()
  .min(1, "Введите пароль")
  .min(8, "Пароль должен быть не короче 8 символов")
  .regex(/[a-zа-я]/, "Пароль должен содержать строчную букву")
  .regex(/[A-ZА-Я]/, "Пароль должен содержать заглавную букву");
//TODO: синхронизировать данные с бекендом, а то сейчас нельзя зайти в аккаунт админа, ведь в нём нет цифр и спецсимволов
// .regex(/\d/, "Пароль должен содержать цифру")
// .regex(/[^A-Za-zА-Яа-я0-9]/, "Пароль должен содержать спецсимвол");

export const phoneSchema = z
  .string()
  .min(1, "Введите номер телефона")
  .regex(
    /^\+[0-9\s()-]{10,}$/,
    "Телефон должен начинаться с + и содержать только цифры, пробелы, скобки и дефисы",
  )
  .transform((val) => val.replace(/[\s()-]/g, ""))
  .refine(
    (digits) => {
      const phoneWithoutPlus = digits.replace(/^\+/, "");
      return phoneWithoutPlus.length >= 10 && phoneWithoutPlus.length <= 15;
    },
    {
      message: "Телефон должен содержать от 10 до 15 цифр после +",
    },
  );

export const fullNameSchema = z
  .string()
  .min(1, "Обязательное поле")
  .max(100, "Слишком длинное имя");

export const positionSchema = z.string().min(1, "Обязательное поле");

export const requiredStringSchema = z.string().min(1, "Обязательное поле");

export const birthdaySchema = z
  .date()
  .nullable()
  .refine((val) => val !== null, {
    message: "Обязательное поле",
  });

export const competenciesSchema = z.array(z.string()).optional();
