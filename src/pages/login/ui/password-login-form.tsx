import { useForm } from "react-hook-form";

import { Input, PasswordInput } from "@ui/input";
import { Button } from "@ui/button";
import { cn } from "@/shared/lib";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordLoginSchema,
  type TPasswordLoginFormValues,
} from "../model/password-login-schema";

import mailIcon from "@icons/mail.svg";

export const PasswordLoginForm = () => {
  const form = useForm<TPasswordLoginFormValues>({
    resolver: zodResolver(passwordLoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: TPasswordLoginFormValues) => {
    console.log("вход по паролю", values.email, values.password);
  };

  const isSubmitDisabled = !form.formState.isValid;

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Введите email"
          iconLeft={mailIcon}
          wrapperClassName={cn(
            "h-11",
            form.formState.errors.email && "border-destructive",
          )}
          {...form.register("email")}
        />
        <p className="min-h-5 body-overline text-destructive">
          {form.formState.errors.email?.message}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="block">
          Пароль
        </label>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="Введите пароль"
          wrapperClassName={cn(
            "h-11",
            form.formState.errors.password && "border-destructive",
          )}
          {...form.register("password")}
        />
        <p className="min-h-5 body-overline text-destructive">
          {form.formState.errors.password?.message}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          type="button"
          variant="plain"
          className="self-end mr-3 text-(--color-purple-400)"
        >
          Забыли пароль?
        </Button>
        <Button disabled={isSubmitDisabled} className="h-10">
          Войти
        </Button>
      </div>
    </form>
  );
};
