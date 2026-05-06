import type { ReactNode } from "react";
import { cn } from "@/shared/lib";
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg";
import BirthdayIcon from "@/shared/assets/icons/birthday.svg"; // ← иконка для заглушки, убрать по готовности Notification

interface PageHeaderProps {
  title?: string;
  stats?: ReactNode;
  search?: ReactNode;
  notifications?: ReactNode;
  user?: {
    avatar?: string;
    name: string;
    position: string;
  };
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
          /* ВРЕМЕННАЯ ЗАГЛУШКА: иконка уведомлений */
          <button className="flex h-11 w-11 items-center justify-center rounded transition-colors hover:bg-gray-100">
            <img src={BirthdayIcon} alt="Уведомления" className="h-5 w-5" />
          </button>
        )}
        {/* TODO: раскомментировать, когда будет готов компонент Notification
        {notifications && (
          <div className="flex h-11 w-11 items-center justify-center rounded">
            {notifications}
          </div>
        )}
        */}

        {/* Профиль пользователя */}
        {user && (
          <div className="flex h-[60px] w-[303px] items-center gap-3 rounded-lg bg-gray-25 px-2 py-1">
            {/* Аватар */}
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <span className="text-lg font-semibold">
                  {user.name.charAt(0)}
                </span>
              </div>
            )}

            {/* Имя и должность */}
            <div className="flex flex-col gap-1">
              <span className="body-m-semibold whitespace-nowrap text-black">
                {user.name}
              </span>
              <span className="body-m text-black">{user.position}</span>
            </div>

            {/* Стрелка вниз */}
            <img
              src={ArrowDownIcon}
              alt=""
              className="ml-auto h-5 w-5 shrink-0"
            />
          </div>
        )}

        {/* Дополнительные действия */}
        {rightActions && rightActions}
      </div>
    </header>
  );
}