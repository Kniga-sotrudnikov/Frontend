import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { LinkSentNotice } from "./link-sent-notice";
import { cn } from "@/shared/lib";

import type { TLinkCooldown } from "../model/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  linkLoginSchema,
  type TLinkLoginFormValues,
} from "../model/link-login-schema";

import mailIcon from "@icons/mail.svg";

const LINK_TIMER = 30;

const getLinkCooldownExpiresAt = () => {
  return Date.now() + LINK_TIMER * 1000;
};

export const LinkLoginForm = () => {
  const [linkCooldown, setLinkCooldown] = useState<TLinkCooldown | null>(null);

  const form = useForm<TLinkLoginFormValues>({
    resolver: zodResolver(linkLoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: TLinkLoginFormValues) => {
    console.log("вход по ссылке", values.email);
    setLinkCooldown({
      email: values.email,
      expiresAt: getLinkCooldownExpiresAt(),
    });
  };

  const handleCooldownComplete = () => {
    setLinkCooldown(null);
  };

  const isSubmitDisabled = linkCooldown !== null || !form.formState.isValid;

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
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
        disabled={isSubmitDisabled}
        className="h-10 w-full"
      >
        Отправить ссылку
      </Button>

      {linkCooldown && (
        <LinkSentNotice
          email={linkCooldown.email}
          expiresAt={linkCooldown.expiresAt}
          onComplete={handleCooldownComplete}
        />
      )}
    </form>
  );
};
