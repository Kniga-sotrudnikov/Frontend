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
        "flex w-full flex-nowrap items-center justify-between gap-2 overflow-x-auto border-b border-gray-200 bg-white px-4 py-4 lg:gap-4 lg:px-8",
        className,
      )}
    >
      <div className="flex shrink-0 flex-col gap-1">
        {title && (
          <h1 className="whitespace-nowrap font-family-primary text-[18px] font-semibold leading-[24px] text-black lg:text-[32px] lg:leading-[44px]">
            {title}
          </h1>
        )}
        {stats && (
          <div className="body-s whitespace-nowrap text-gray-600 text-xs lg:text-base">
            {stats}
          </div>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2 lg:gap-4">
        {search && (
          <div className="w-full lg:w-[356px]">{search}</div>
        )}
        {birthday && birthday}
        {user && user}
        {rightActions && rightActions}
      </div>
    </header>
  );
}
