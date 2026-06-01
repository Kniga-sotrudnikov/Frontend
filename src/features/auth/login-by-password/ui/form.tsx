import { useForm } from "react-hook-form";

import { Input, PasswordInput } from "@ui/input";
import { Button } from "@ui/button";
import { cn } from "@/shared/lib";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordLoginSchema,
  type TPasswordLoginFormValues,
} from "../model/schema";

import mailIcon from "@icons/mail.svg";
import { useLoginByPassword } from "../model/use-login-by-password";

export const PasswordLoginForm = () => {
  const form = useForm<TPasswordLoginFormValues>({
    resolver: zodResolver(passwordLoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLoginByPassword();

  // Вывел ошибку в root и сделал отдельный текстовый элемент.
  // В фигме этого нет.
  const onSubmit = (values: TPasswordLoginFormValues) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        form.setError("root", {
          message: error.detail,
        });
      },
    });
  };

  const isSubmitDisabled = !form.formState.isValid || isPending;

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
          {...form.register("email", {
            onChange: () => form.clearErrors("root"),
          })}
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
          {...form.register("password", {
            onChange: () => form.clearErrors("root"),
          })}
        />
        <p className="min-h-5 body-overline text-destructive">
          {form.formState.errors.password?.message}
        </p>
      </div>

      {form.formState.errors.root?.message && (
        <p className="min-h-5 body-overline text-destructive">
          {form.formState.errors.root.message}
        </p>
      )}

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
