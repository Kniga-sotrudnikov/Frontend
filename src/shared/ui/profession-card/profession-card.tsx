import { Button } from "@ui/button";
import { cn } from "@/shared/lib";
import StarIcon from "@/shared/assets/icons/star.svg";
import MoreVerticalIcon from "@/shared/assets/icons/more-vertical.svg";

interface ProfessionCardProps {
  city: string;
  photo?: string;
  profession: string;
  position: string;
  franchise: string;
  department: string;
  isArchived?: boolean;
  onFavorite?: () => void;
  onMore?: () => void;
  onRespond?: () => void;
}

export const ProfessionCard = ({
  city,
  photo,
  profession,
  position,
  franchise,
  department,
  isArchived = false,
  onFavorite,
  onMore,
  onRespond,
}: ProfessionCardProps) => {
  return (
    <div
      className={cn(
        "w-[458px] h-[242px] p-[24px] border border-gray-200 rounded-8",
        {
          "bg-gray-50 opacity-70": isArchived,
          "bg-white": !isArchived,
        },
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="body-overline text-gray-600 max-w-[290px] truncate">
          {city}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onFavorite}
            className="p-0 text-gray-500 hover:text-yellow-500 transition-colors"
            aria-label="В избранное"
          >
            <img src={StarIcon} alt="" className="size-[20px]" />
          </button>

          <button
            onClick={onMore}
            className="p-0 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Действия"
          >
            <img src={MoreVerticalIcon} alt="" className="size-[20px]" />
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        {/* Фото */}
        <div className="flex-shrink-0 w-[106px] h-[94px] bg-gray-100 rounded-8 overflow-hidden">
          {photo ? (
            <img
              src={photo}
              alt="Фото сотрудника"
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full flex items-center justify-center text-gray-400 text-xs">
              Нет фото
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 gap-2">
          <h3
            className={cn(
              "body-s-semibold text-gray-900 max-w-[290px] mb-2 truncate",
              isArchived && "text-gray-500",
            )}
          >
            {profession}
          </h3>
          <p
            className={cn(
              "body-s mb-2 max-w-[290px] truncate",
              isArchived ? "text-gray-500" : "text-gray-600",
            )}
          >
            {position}
          </p>
          <p
            className={cn(
              "body-overline mb-1 max-w-[290px] truncate",
              isArchived ? "text-gray-400" : "text-gray-500",
            )}
          >
            {franchise}
          </p>
          <p
            className={cn(
              "body-overline max-w-[290px] truncate",
              isArchived ? "text-gray-400" : "text-gray-500",
            )}
          >
            {department}
          </p>
        </div>
      </div>

      <Button
        variant="default"
        size="default"
        onClick={onRespond}
        className="w-full"
        disabled={isArchived}
      >
        {isArchived ? (
          "Архивировано"
        ) : (
          <>
            <span className="">+</span>
            Откликнуться
          </>
        )}
      </Button>
    </div>
  );
};
