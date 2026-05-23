import { Input, PasswordInput } from "@ui/input";
import { Button } from "@ui/button";

import LogoFull from "@/shared/assets/images/full-logo.svg?react";
import ToastIcon from "@icons/toast.svg?react";
import mailIcon from "@icons/mail.svg";
import loginImage from "@/shared/assets/images/login.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
  const loginSchema = z
    .object({
      authType: z.enum(["link", "password"]),
      email: z
        .string()
        .min(1, "Введите email")
        .email("Введите корректный email"),
      password: z.string().optional(),
    })
    .superRefine((values, ctx) => {
      if (values.authType === "password" && !values.password?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["password"],
          message: "Введите пароль",
        });
      }
    });
  type TLoginFormValues = z.infer<typeof loginSchema>;

  const form = useForm<TLoginFormValues>({
    resolver: zodResolver(loginSchema),
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
      return;
    }

    console.log("вход с паролем", values.email, values.password);
  };

  return (
    <section className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-161.5 h-dvh bg-secondary">
        <LogoFull className="mb-16.25 text-secondary-foreground" />
        <h1 className="max-w-120 h3 leading-6">
          Корпоративная платформа для командной работы и общения
        </h1>
        <img src={loginImage} alt="" width="573" height="691" />
      </div>

      <div className="flex flex-col justify-center items-center w-198.5 h-dvh">
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-115 pt-10 px-7 pb-3.5 border border-border rounded-12"
        >
          <h3 className="leading-none">Вход</h3>

          <Tabs
            defaultValue="link"
            value={authType}
            onValueChange={(value) =>
              form.setValue("authType", value as TLoginFormValues["authType"])
            }
            className="mt-8.75 gap-7.5"
          >
            <TabsList variant="line" className="mx-auto gap-13">
              <TabsTrigger value="link">Одноразовая ссылка</TabsTrigger>
              <TabsTrigger value="password">Пароль</TabsTrigger>
            </TabsList>

            <TabsContent value="link" className="mb-20">
              <div className="flex flex-col gap-2 mb-7">
                <label htmlFor="link" className="block">
                  Email
                </label>
                <Input
                  id="link"
                  type="email"
                  autoComplete="email"
                  iconLeft={mailIcon}
                  wrapperClassName="h-11"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
                <p className="body-overline text-(--color-gray-300) leading-4">
                  Мы отправим ссылку для входа на вашу почту. Ссылка действует
                  15 минут
                </p>
              </div>
              <Button className="h-10 w-full">Отправить ссылку</Button>

              <div className="flex flex-col bg-(--color-green-100) p-2 mt-6.5 rounded-8">
                <div className="flex items-center gap-2">
                  <ToastIcon className="text-(--color-green-700)" />
                  <span className="text-(--color-green-700) button-small">
                    Письмо отправлено на name@company.org
                  </span>
                </div>
                <span className="text-(--color-green-700) self-start pl-8">
                  Отправить еще раз (30 с)
                </span>
              </div>
            </TabsContent>

            <TabsContent value="password" className="mb-9">
              <div className="mb-5.75">
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  iconLeft={mailIcon}
                  wrapperClassName="h-11"
                  {...form.register("email")}
                />
              </div>
              <div className="mb-3.5">
                <label htmlFor="password" className="block mb-2">
                  Пароль
                </label>
                <PasswordInput
                  id="password"
                  autoComplete="current-password"
                  wrapperClassName="h-11"
                  {...form.register("password")}
                />
              </div>

              <div className="flex flex-col gap-5">
                <Button
                  type="button"
                  variant="ghost"
                  className="max-w-37.5 self-end mr-3"
                >
                  Забыли пароль?
                </Button>
                <Button className="h-10">Войти</Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center items-center gap-1">
            <span className="body-s">Нет доступа?</span>
            <Button type="button" variant="ghost">
              Обратитесь к HR
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export const Component = LoginPage;
