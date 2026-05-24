import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { cn } from "@/shared/lib";
import { LinkSentNotice } from "./link-sent-notice";

import { type UseFormReturn } from "react-hook-form";
import { type TLoginFormValues } from "../model/login-schema";
import type { TLinkCooldown } from "@/pages/login/model/types";

import mailIcon from "@icons/mail.svg";

type TLinkLoginTabProps = {
  form: UseFormReturn<TLoginFormValues>;
  isButtonDisabled: boolean;
  linkCooldown: TLinkCooldown | null;
  onCooldownComplete: () => void;
};

export const LinkLoginTab = ({
  form,
  isButtonDisabled,
  linkCooldown,
  onCooldownComplete,
}: TLinkLoginTabProps) => {
  return (
    <div>
      <div className="flex flex-col gap-2 mb-7">
        <label htmlFor="link" className="block">
          Email
        </label>
        <Input
          id="link"
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
        <p className="body-overline text-(--color-gray-300) leading-4">
          Мы отправим ссылку для входа на вашу почту. Ссылка действует 15 минут
        </p>
      </div>
      <Button
        variant="default"
        disabled={isButtonDisabled}
        className="h-10 w-full"
      >
        Отправить ссылку
      </Button>

      {linkCooldown && (
        <LinkSentNotice
          email={linkCooldown.email}
          expiresAt={linkCooldown.expiresAt}
          onComplete={onCooldownComplete}
        />
      )}
    </div>
  );
};
