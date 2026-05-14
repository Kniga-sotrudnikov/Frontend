import type { ReactNode } from "react";
import { cn } from "@/shared/lib";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";

interface PageHeaderProps {
  title?: string;
  stats?: ReactNode;
  search?: ReactNode;
  notifications?: ReactNode;
  user?: ReactNode;
  rightActions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  stats,
  search,
  notifications,
  user,
  rightActions,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between gap-4 border-b border-gray-200 bg-white px-8 py-4",
        className,
      )}
    >
      {/* Левая часть: заголовок + статистика */}
      <div className="flex flex-col gap-1">
        {title && (
          <h1 className="font-family-primary text-[32px] font-semibold leading-[44px] text-black">
            {title}
          </h1>
        )}
        {stats && <div className="body-s text-gray-600">{stats}</div>}
      </div>

      {/* Правая часть: поиск + уведомления + профиль */}
      <div className="flex items-center gap-10">
        {/* Поиск */}
        {search && <div className="w-[356px]">{search}</div>}

        {/* Уведомления (ДР и т.д.) */}
        {notifications ? (
          <div className="flex h-11 w-11 items-center justify-center rounded">
            {notifications}
          </div>
        ) : (
          /* Иконка дней рождений с интерактивом */
          <BirthdaysPopover />
        )}

        {/* Профиль пользователя */}
        {user && user}

        {/* Дополнительные действия */}
        {rightActions && rightActions}
      </div>
    </header>
  );
}