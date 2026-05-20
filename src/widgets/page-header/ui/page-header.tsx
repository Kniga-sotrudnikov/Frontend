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
        "flex flex-col gap-4 border-b border-gray-200 bg-white px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8",
        className,
      )}
    >
      {/* Левая часть: заголовок + статистика */}
      <div className="flex flex-col gap-1">
        {title && (
          <h1 className="font-family-primary text-[24px] font-semibold leading-[32px] text-black lg:text-[32px] lg:leading-[44px]">
            {title}
          </h1>
        )}
        {stats && <div className="body-s text-gray-600">{stats}</div>}
      </div>

      {/* Правая часть: поиск + уведомления + профиль */}
      <div className="flex items-center gap-10">
        {/* Поиск */}
        {search && <div className="w-[356px]">{search}</div>}

        {/* Birthday (Дни рождения) */}
        {birthday && birthday}

        {/* Профиль пользователя */}
        {user && user}

        {/* Дополнительные действия */}
        {rightActions && rightActions}
      </div>
    </header>
  );
}
