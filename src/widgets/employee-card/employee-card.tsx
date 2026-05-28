import { useState, type ReactElement } from "react";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { useNotificationStore } from "@/shared/model/stores";
import StarIcon from "@/shared/assets/icons/star.svg?react";
import MoreVerticalIcon from "@/shared/assets/icons/more-vertical.svg?react";
import EditIcon from "@/shared/assets/icons/edit.svg?react";
import ArchiveIcon from "@/shared/assets/icons/delete.svg?react";

interface EmployeeCardProps {
  primaryInfo: ReactElement;
  city: string;
  linearManager: string;
  onFavorite?: () => void;
  onEdit?: () => void;
  onArchive?: () => void;
}

export const EmployeeCard = ({
  city,
  linearManager,
  primaryInfo,
  onFavorite,
  onEdit,
  onArchive,
}: EmployeeCardProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const addNotification = useNotificationStore((state) => state.add);

  const handleFavoriteDefault = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Избранное будет доступно в ближайшее время",
    });
  };

  const handleEditDefault = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Редактирование будет доступно в ближайшее время",
    });
  };

  const handleArchiveDefault = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Архивирование будет доступно в ближайшее время",
    });
  };

  const onFavoriteClick = onFavorite || handleFavoriteDefault;
  const onEditClick = onEdit || handleEditDefault;
  const onArchiveClick = onArchive || handleArchiveDefault;

  const handleEdit = () => {
    setPopoverOpen(false);
    onEditClick();
  };

  const handleArchive = () => {
    setPopoverOpen(false);
    onArchiveClick();
  };

  return (
    <div className="flex flex-col p-5.75 border border-gray-200 rounded-8 bg-white">
      <div className="flex items-center justify-between mb-4">
        <span className="body-overline text-gray-600 wrap-break-word">
          {city}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onFavoriteClick}
            className="p-0 text-gray-500 cursor-pointer"
            aria-label="В избранное"
          >
            <StarIcon className="size-5" />
          </button>

          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                className="p-0 text-gray-500 cursor-pointer"
                aria-label="Действия"
              >
                <MoreVerticalIcon className="size-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-42.75 p-0 overflow-hidden"
              align="end"
              sideOffset={-40}
              alignOffset={-20}
            >
              <div className="flex flex-col">
                <Button
                  variant="ghost"
                  size="default"
                  onClick={handleEdit}
                  className="flex items-center gap-2 w-full px-4 py-3 rounded-none h-auto body-s text-black hover:bg-gray-100 transition-colors border-0 border-b border-b-gray-200"
                >
                  <EditIcon className="size-5" />
                  <span>Редактировать</span>
                </Button>
                <Button
                  variant="ghost"
                  size="default"
                  onClick={handleArchive}
                  className="flex items-center gap-2 w-full px-4 py-3 rounded-none h-auto body-s text-red-600 hover:bg-gray-100 transition-colors border-0"
                >
                  <ArchiveIcon className="size-5" />
                  <span>Архивировать</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="border-b pb-3 mb-3">{primaryInfo}</div>

      <div className="mt-auto">
        <div className="flex items-center gap-2">
          <span className="body-overline-semibold text-black">
            Линейный рук.:
          </span>
          <span className="body-overline text-black wrap-break-word">
            {linearManager}
          </span>
        </div>
      </div>
    </div>
  );
};
