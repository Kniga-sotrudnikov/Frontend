import React, { useState } from "react";
import { cn } from "@/shared/lib";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { useNotificationStore } from "@/shared/model/stores";
import StarIcon from "@/shared/assets/icons/star.svg";
import MoreVerticalIcon from "@/shared/assets/icons/more-vertical.svg";
import EditIcon from "@/shared/assets/icons/edit.svg";
import ArchiveIcon from "@/shared/assets/icons/delete.svg";
import WorkingIcon from "@/shared/assets/icons/working.svg";
import BizTripIcon from "@/shared/assets/icons/biz-trip.svg";
import VacationIcon from "@/shared/assets/icons/vacation.svg";
import defaultPhoto from "@/shared/assets/images/avatar-placeholder.jpg";

type EmployeeStatus = "working" | "bizTrip" | "vacation";

interface EmployeeCardProps {
  city: string;
  photo?: string;
  profession: string;
  position: string;
  franchise: string;
  department: string;
  linearManager: string; // ФИО линейного руководителя
  status: EmployeeStatus; // Статус сотрудника
  isArchived?: boolean;
  onFavorite?: () => void;
  onEdit?: () => void;
  onArchive?: () => void;
}

const statusIconMap: Record<EmployeeStatus, string> = {
  working: WorkingIcon,
  bizTrip: BizTripIcon,
  vacation: VacationIcon,
};

const statusLabelMap: Record<EmployeeStatus, string> = {
  working: "Работает",
  bizTrip: "Командировка",
  vacation: "Отпуск",
};

export const EmployeeCard = ({
  city,
  photo = defaultPhoto,
  profession,
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
    <div className="w-114.5 h-60.5 p-5.75 border border-gray-200 rounded-8 bg-white">
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
            <img src={StarIcon} alt="" className="size-5" />
          </button>

          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                className="p-0 text-gray-500 cursor-pointer"
                aria-label="Действия"
              >
                <img src={MoreVerticalIcon} alt="" className="size-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-42.75 p-0 overflow-hidden"
              align="end"
              sideOffset={-40}
              alignOffset={-20}
            >
              <div className="flex flex-col">
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 w-full p-3 border-b border-gray-200 body-s text-black hover:bg-gray-100 transition-colors text-left"
                >
                  <img src={EditIcon} alt="" className="size-5" />
                  <span>Редактировать</span>
                </button>
                <button
                  onClick={handleArchive}
                  className="flex items-center gap-2 w-full p-3 body-s text-red-600 hover:bg-gray-100 transition-colors text-left"
                >
                  <img src={ArchiveIcon} alt="" className="size-5" />
                  <span>Архивировать</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex gap-4 border-b pb-4 mb-3.25">
        <div className="relative shrink-0 w-26.5 h-23.5 bg-gray-100 rounded-8 overflow-hidden">
          <img
            src={photo}
            alt="Фото сотрудника"
            className={cn("size-full object-cover", isArchived && "grayscale")}
          />
          {/* Иконка статуса в правом нижнем углу фото */}
          <div className="absolute bottom-1 right-1">
            <img
              src={statusIconMap[status]}
              alt={statusLabelMap[status]}
              className="size-5"
              title={statusLabelMap[status]}
            />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="body-s-semibold text-gray-900 max-w-72.5 mb-2 truncate">
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

      {/* Блок линейного руководителя под чертой */}
      <div className="flex items-center gap-2">
        <span className="body-s font-semibold text-gray-700">
          Линейный рук.:
        </span>
        <span className="body-s text-gray-700 truncate">{linearManager}</span>
      </div>
    </div>
  );
};
