import { Input, PasswordInput } from "@ui/input";
import { Button } from "@ui/button";
import { cn } from "@/shared/lib";

import type { UseFormReturn } from "react-hook-form";
import type { TLoginFormValues } from "../model/login-schema";

import mailIcon from "@icons/mail.svg";

type TPasswordLoginTabProps = {
  form: UseFormReturn<TLoginFormValues>;
  isButtonDisabled: boolean;
};

export const PasswordLoginTab = ({
  form,
  isButtonDisabled,
}: TPasswordLoginTabProps) => {
  return (
    <div>
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
        <Button disabled={isButtonDisabled} className="h-10">
          Войти
        </Button>
      </div>
    </div>
  );
};
