import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib";
import { useNotificationStore } from "@/shared/model/stores";
import StarIcon from "@/shared/assets/icons/star.svg?react";
import PlusIcon from "@/shared/assets/icons/plus.svg?react";
import defaultPhoto from "@/shared/assets/images/avatar-placeholder.jpg";

interface ProfessionCardProps {
  city: string;
  photo?: string;
  profession: string;
  position: string;
  franchise: string;
  department: string;
  isArchived?: boolean;
  // TODO: убрать после подключения TanStack Query — получать из useFavoritesQuery()
  isFavorite?: boolean;
  onFavorite?: () => void;
  onRespond?: () => void;
}

export const ProfessionCard = ({
  city,
  photo = defaultPhoto,
  profession,
  position,
  franchise,
  department,
  isArchived = false,
  isFavorite = false,
  onFavorite,
  onRespond,
}: ProfessionCardProps) => {
  const addNotification = useNotificationStore((state) => state.add);

  // Дефолтные обработчики с уведомлениями
  const handleFavoriteDefault = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Избранное будет доступно в ближайшее время",
    });
  };

  const handleRespondDefault = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Отклик на вакансию будет доступен в ближайшее время",
    });
  };

  // Используем переданные обработчики или дефолтные
  const onFavoriteClick = onFavorite || handleFavoriteDefault;
  const onRespondClick = onRespond || handleRespondDefault;

  return (
    <div className="w-full max-w-114.5 min-w-72 h-auto min-h-60.5 p-5.75 border border-gray-200 rounded-8 bg-white">
      <div className="flex items-center justify-between mb-4">
        <span className="body-overline text-gray-600 max-w-72.5 truncate">
          {city}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onFavoriteClick}
            className="p-0 text-gray-500 cursor-pointer"
            aria-label="В избранное"
          >
            <StarIcon className={isFavorite ? "size-5 text-purple-500" : "size-5 text-gray-300"} />
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b pb-4 mb-3.25">
        <div className="shrink-0 w-26.5 h-23.5 bg-gray-100 rounded-8 overflow-hidden">
          <img
            src={photo}
            alt="Фото сотрудника"
            className={cn("size-full object-cover", isArchived && "grayscale")}
          />
        </div>

        <div className="flex-1">
          <h3 className="body-s-semibold text-black max-w-72.5 mb-2 truncate">
            {profession}
          </h3>
          <p className="body-s mb-3 max-w-72.5 truncate text-gray-600">
            {position}
          </p>
          <p className="body-overline mb-2 max-w-72.5 truncate text-gray-600">
            {franchise}
          </p>
          <p className="body-overline max-w-72.5 truncate text-gray-600">
            {department}
          </p>
        </div>
      </div>

      <Button
        variant="default"
        size="default"
        onClick={onRespondClick}
        className="w-full p-4 hover:bg-purple-400 hover:text-white disabled:opacity-100 disabled:bg-gray-300"
        disabled={isArchived}
      >
        {isArchived ? (
          "Архивировано"
        ) : (
          <>
            <PlusIcon className="size-4 mr-1 brightness-0 invert" />
            Откликнуться
          </>
        )}
      </Button>
    </div>
  );
};
