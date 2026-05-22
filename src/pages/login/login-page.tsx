import { Input, PasswordInput } from "@ui/input";
import { Button } from "@ui/button";

import LogoFull from "@/shared/assets/images/full-logo.svg?react";
import MailIcon from "@icons/mail.svg";
import loginImage from "@/shared/assets/images/login.png";

const LoginPage = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-161.5 h-dvh bg-secondary">
        <LogoFull className="mb-16.25 text-secondary-foreground" />
        <h1 className="max-w-120 text-(length:--font-size-h3) leading-6">
          Корпоративная платформа для командной работы и общения
        </h1>
        <img src={loginImage} alt="" width="573" height="691" />
      </div>
      <div className="flex flex-col justify-center items-center w-198.5 h-dvh">
        <form className="pt-10.25 px-7 pb-5">
          <span>Вход</span>
          <Input iconLeft={MailIcon} />
          <PasswordInput />
          <Button>Забыли пароль?</Button>
          <Button>Войти</Button>
          <span>Нет доступа?</span>
          <Button>Обратитесь к HR</Button>
        </form>
      </div>
    </section>
  );
};

export const Component = LoginPage;
