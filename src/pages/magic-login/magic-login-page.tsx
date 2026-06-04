import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { useVerifyMagicLink } from "@/features/auth";

const MagicLoginPage = () => {
  const [searchParams] = useSearchParams();
  const calledRef = useRef(false);
  const token = searchParams.get("token");

  const { mutate, isPending, isError, error } = useVerifyMagicLink();

  useEffect(() => {
    if (!token) return;
    if (calledRef.current) return;

    mutate({ token });
  }, [token, mutate]);

  if (!token) {
    return <p>Некорректная ссылка</p>;
  }

  if (isError) {
    return <p>{error.detail || "Ошибка входа"}</p>;
  }

  if (isPending) {
    return <p>Выполняется вход...</p>;
  }

  return <p>Перенаправление...</p>;
};

export const Component = MagicLoginPage;
