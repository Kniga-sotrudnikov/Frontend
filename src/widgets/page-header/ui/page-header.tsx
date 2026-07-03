import type { ReactNode } from "react";
import { cn } from "@/shared/lib";

interface PageHeaderProps {
  title?: string;
  stats?: ReactNode;
  search?: ReactNode;
  birthday?: ReactNode;
  user?: ReactNode;
  rightActions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  stats,
  search,
  birthday,
  user,
  rightActions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-5 border-b border-gray-200 bg-white px-4 py-4 lg:px-8",
        className,
      )}
    >
      {/* Левая часть: заголовок + статистика */}
      <div className="flex shrink-0 flex-col gap-1">
        {title && (
          <h1 className="font-family-primary font-semibold text-black text-[32px] leading-[44px] max-[1100px]:text-[24px]">
            {title}
          </h1>
        )}
        {stats && (
          <div className="body-s text-gray-600 max-[1100px]:text-xs">
            {stats}
          </div>
        )}
      </div>

      {/* Правая часть: поиск + уведомления + профиль */}
      <div className="flex min-w-0 items-center justify-end gap-10 max-[1240px]:gap-6 max-[1100px]:gap-4">
        {/* Поиск */}
        {search && (
          <div className="min-w-[180px] w-[356px] max-w-[356px] shrink max-[1180px]:w-[clamp(180px,26vw,356px)]">
            {search}
          </div>
        )}

        {/* Birthday (Дни рождения) */}
        {birthday && <div className="shrink-0">{birthday}</div>}

        {/* Профиль пользователя */}
        {user && <div className="shrink-0">{user}</div>}

        {/* Дополнительные действия */}
        {rightActions && <div className="shrink-0">{rightActions}</div>}
      </div>
    </header>
  );
}
