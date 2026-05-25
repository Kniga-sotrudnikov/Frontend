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
  .regex(/[A-ZА-Я]/, "Пароль должен содержать заглавную букву")
  .regex(/\d/, "Пароль должен содержать цифру")
  .regex(/[^A-Za-zА-Яа-я0-9]/, "Пароль должен содержать спецсимвол");
