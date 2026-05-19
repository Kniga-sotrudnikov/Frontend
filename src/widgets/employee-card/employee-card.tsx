import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { useNotificationStore } from "@/shared/model/stores";
import StarIcon from "@/shared/assets/icons/star.svg?react";
import MoreVerticalIcon from "@/shared/assets/icons/more-vertical.svg?react";
import EditIcon from "@/shared/assets/icons/edit.svg?react";
import ArchiveIcon from "@/shared/assets/icons/delete.svg?react";
import WorkingIcon from "@/shared/assets/icons/working.svg";
import BizTripIcon from "@/shared/assets/icons/biz-trip.svg";
import VacationIcon from "@/shared/assets/icons/vacation.svg";
import SickIcon from "@/shared/assets/icons/sick.svg";
import defaultPhoto from "@/shared/assets/images/avatar-placeholder.jpg";

type EmployeeStatus = "working" | "bizTrip" | "vacation" | "sick";

export interface EmployeeCardProps {
  id: number | string;
  city: string;
  photo?: string;
  name: string;
  position: string;
  franchise: string;
  department: string;
  linearManager: string;
  status: EmployeeStatus;
  isArchived?: boolean;
  onFavorite?: () => void;
  onEdit?: () => void;
  onArchive?: () => void;
}

const statusIconMap: Record<EmployeeStatus, string> = {
  working: WorkingIcon,
  bizTrip: BizTripIcon,
  vacation: VacationIcon,
  sick: SickIcon,
};

const statusLabelMap: Record<EmployeeStatus, string> = {
  working: "Работает",
  bizTrip: "В командировке",
  vacation: "В отпуске",
  sick: "На больничном",
};

export const EmployeeCard = ({
  city,
  photo = defaultPhoto,
  name,
  position,
  franchise,
  department,
  linearManager,
  status,
  isArchived = false,
  onFavorite,
  onEdit,
  onArchive,
}: EmployeeCardProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const addNotification = useNotificationStore((state) => state.add);

  // Дефолтные обработчики с уведомлениями
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

  // Используем переданные обработчики или дефолтные
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
    <div className="w-full max-w-114.5 min-w-72 h-auto min-h-54.25 p-5.75 border border-gray-200 rounded-8 bg-white">
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

      <div className="flex gap-4 border-b pb-3 mb-3">
        <div className="relative shrink-0 w-26.5 h-23.5 bg-gray-100 rounded-8 overflow-hidden">
          <img
            src={photo}
            alt="Фото сотрудника"
            className={cn("size-full object-cover", isArchived && "grayscale")}
          />

          {!isArchived && (
            <div className="absolute bottom-0 right-0">
              <img
                src={statusIconMap[status]}
                alt={statusLabelMap[status]}
                className="size-6"
                title={statusLabelMap[status]}
              />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="body-s-semibold text-black max-w-72.5 mb-2 truncate">
            {name}
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

      <div className="flex items-center gap-2">
        <span className="body-overline-semibold text-black">
          Линейный рук.:
        </span>
        <span className="body-overline text-black truncate">
          {linearManager}
        </span>
      </div>
    </div>
  );
};
