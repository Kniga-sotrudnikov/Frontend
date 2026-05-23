import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type TLoginFormValues } from "./model/login-schema.ts";

import { cn } from "@/shared/lib";
import { Button } from "@ui/button";
import { Input, PasswordInput } from "@ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import LogoFull from "@/shared/assets/images/full-logo.svg?react";
import ToastIcon from "@icons/toast.svg?react";
import ShieldIcon from "@icons/shield.svg?react";
import mailIcon from "@icons/mail.svg";
import loginImage from "@/shared/assets/images/login.png";

const LoginPage = () => {
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const LINK_TIMER = 30;

  useEffect(() => {
    if (secondsLeft <= 0) {
      setSentEmail(null);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prevState) => prevState - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [secondsLeft]);

  const form = useForm<TLoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      authType: "link",
      email: "",
      password: "",
    },
  });

  const authType = form.watch("authType");

  const onSubmit = (values: TLoginFormValues) => {
    if (values.authType === "link") {
      console.log("вход по ссылке", values.email);

      setSentEmail(values.email);
      setSecondsLeft(LINK_TIMER);

      return;
    }

    console.log("вход с паролем", values.email, values.password);
  };

  const isValid = form.formState.isValid;
  const isLinkCooldown = secondsLeft > 0;

  return (
    <section className="flex min-h-dvh">
      <div className="flex w-[45%] min-w-120 flex-col justify-center items-center bg-secondary">
        <LogoFull className="mb-16.25 text-secondary-foreground" />
        <h1 className="max-w-120 h3 leading-6 px-10 lg:px-0">
          Корпоративная платформа для командной работы и общения
        </h1>
        <img
          src={loginImage}
          alt=""
          width="573"
          height="691"
          className="max-h-[60dvh] max-w-[90%] object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center items-start gap-6 px-6 lg:pl-36.75">
        <div className="flex flex-col gap-1.5 max-w-135">
          <p className="text-(length:--font-size-body-l)">
            Доступ только для сотрудников проекта “Всё получится”
          </p>
          <div className="flex items-center">
            <ShieldIcon />
            <p>Контакты и данные сотрудников защищены</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6 w-full max-w-115">
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full pt-10 px-7 pb-5.5 border border-border rounded-12"
          >
            <h3 className="leading-none">Вход</h3>

            <Tabs
              value={authType}
              onValueChange={(value) =>
                form.setValue(
                  "authType",
                  value as TLoginFormValues["authType"],
                  {
                    shouldValidate: true,
                  },
                )
              }
              className="mt-8.75 gap-7.5"
            >
              <TabsList
                variant="line"
                className="mx-auto gap-13 w-full border-b border-border"
              >
                <TabsTrigger value="link" className="cursor-pointer">
                  Одноразовая ссылка
                </TabsTrigger>
                <TabsTrigger value="password" className="cursor-pointer">
                  Пароль
                </TabsTrigger>
              </TabsList>

              <TabsContent value="link" className="mb-10">
                <div className="flex flex-col gap-2 mb-7">
                  <label htmlFor="link" className="block">
                    Email
                  </label>
                  <Input
                    id="link"
                    type="email"
                    autoComplete="email"
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
                    Мы отправим ссылку для входа на вашу почту. Ссылка действует
                    15 минут
                  </p>
                </div>
                <Button
                  variant="default"
                  disabled={!isValid || isLinkCooldown}
                  className="h-10 w-full"
                >
                  Отправить ссылку
                </Button>

                {sentEmail && secondsLeft > 0 && (
                  <div className="flex flex-col bg-(--color-green-100) p-2 mt-6.5 rounded-8">
                    <div className="flex items-center gap-2">
                      <ToastIcon className="shrink-0 text-(--color-green-700)" />
                      <span className="text-(--color-green-700) button-small">
                        {`Письмо отправлено на ${sentEmail}`}
                      </span>
                    </div>
                    <span className="text-(--color-green-700) self-start pl-8">
                      {`Отправить еще раз (${secondsLeft} с)`}
                    </span>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="password" className="mb-9">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="block">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
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
                  <Button disabled={!isValid} className="h-10">
                    Войти
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-center items-center gap-1">
              <span className="body-s">Нет доступа?</span>
              <Button
                type="button"
                variant="plain"
                className="text-(--color-purple-400)"
              >
                Обратитесь к HR
              </Button>
            </div>
          </form>
          <p className="body-overline">
            Ⓒ 2026 Всё получится! Все права защищены.
          </p>
        </div>
      </div>
    </section>
  );
};

export const Component = LoginPage;
