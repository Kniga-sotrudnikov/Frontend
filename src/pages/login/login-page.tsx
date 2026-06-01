import { Button } from "@ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { LinkLoginForm } from "../../features/auth/login-by-link/ui/form";
import { PasswordLoginForm } from "../../features/auth/login-by-password/ui/form";

import LogoFull from "@/shared/assets/images/full-logo.svg?react";
import ShieldIcon from "@icons/shield.svg?react";
import loginImage from "@/shared/assets/images/login.png";

const LoginPage = () => {
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
          <div className="w-full pt-10 px-7 pb-5.5 border border-border rounded-12">
            <h3 className="leading-none">Вход</h3>
            <Tabs defaultValue="link" className="mt-8.75 gap-7.5">
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

              <TabsContent
                value="link"
                forceMount
                className="mb-10 data-[state=inactive]:hidden"
              >
                <LinkLoginForm />
              </TabsContent>

              <TabsContent
                value="password"
                forceMount
                className="mb-9 data-[state=inactive]:hidden"
              >
                <PasswordLoginForm />
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
          </div>
          <p className="body-overline">
            Ⓒ 2026 Всё получится! Все права защищены.
          </p>
        </div>
      </div>
    </section>
  );
};

export const Component = LoginPage;
