import { useState, type ReactElement } from "react";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { useNotificationStore } from "@/shared/model/stores";
import StarIcon from "@/shared/assets/icons/star.svg?react";
import MoreVerticalIcon from "@/shared/assets/icons/more-vertical.svg?react";
import EditIcon from "@/shared/assets/icons/edit.svg?react";
import ArchiveIcon from "@/shared/assets/icons/delete.svg?react";
import RestoreIcon from "@/shared/assets/icons/archive.svg?react";
import { EditEmployeeButton } from "@/features/employee";
import { useDeleteEmployee, type EmployeeData } from "@/entities/employee";
import { cn } from "@/shared/lib";

interface EmployeeCardProps {
  /**
   * Блок основной информации сотрудника.
   * Используется EmployeePrimaryInfo.
   */
  onClick?: () => void;
  primaryInfo: ReactElement;
  city: string;
  linearManager: string;
  employeeData: EmployeeData;
  // TODO: убрать после подключения TanStack Query — получать из useFavoritesQuery()
  isFavorite?: boolean;
  isLoading?: boolean;
  canEdit?: boolean;
  onFavorite?: () => void;
  onArchive?: () => void;
  onRestore?: () => void;
  onUpdateEmployee?: (updatedEmployee: EmployeeData) => void;
}

export const EmployeeCard = ({
  onClick,
  city,
  linearManager,
  primaryInfo,
  employeeData,
  isFavorite = false,
  isLoading = false,
  canEdit = false,
  onFavorite,
  onRestore,
  onUpdateEmployee,
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

  const handleRestoreDefault = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Восстановление сотрудника будет доступно позже",
    });
  };

  // Используем переданные обработчики или дефолтные
  const onFavoriteClick = onFavorite || handleFavoriteDefault;
  const onRestoreClick = onRestore || handleRestoreDefault;

  const handleEditSuccess = (updatedEmployee: EmployeeData) => {
    setPopoverOpen(false);
    onUpdateEmployee?.(updatedEmployee);
  };

  //TODO: Вынести логику запроса на удаление из UI компонента
  // Обработать сценарий если при удалении происходит ошибка
  const { mutate } = useDeleteEmployee();
  const handleArchive = () => {
    mutate(employeeData.id);
    setPopoverOpen(false);
  };

  const handleRestore = () => {
    setPopoverOpen(false);
    onRestoreClick();
  };

  return (
    <div
      onClick={onClick}
      className="flex flex-col p-5.75 border border-gray-200 rounded-8 bg-white cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="body-overline text-gray-600 wrap-break-word">
          {city}
        </span>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex items-center gap-2 shrink-0"
        >
          <button
            onClick={onFavoriteClick}
            disabled={isLoading}
            className={cn(
              "p-0 text-gray-500 cursor-pointer",
              isLoading && "opacity-50 pointer-events-none",
            )}
            aria-label="В избранное"
          >
            <StarIcon
              className={
                isFavorite
                  ? "size-5 fill-current text-purple-500"
                  : "size-5 text-gray-300"
              }
            />
          </button>

          {canEdit && (
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
                  {employeeData.isArchived ? (
                    <Button
                      variant="ghost"
                      size="default"
                      onClick={handleRestore}
                      className="flex items-center gap-2 w-full px-4 py-3 rounded-none h-auto body-s text-black font-normal hover:bg-gray-100 transition-colors border-0 border-b border-b-gray-200"
                    >
                      <RestoreIcon />
                      <span>Разархивировать</span>
                    </Button>
                  ) : (
                    <>
                      <EditEmployeeButton
                        employee={employeeData}
                        onSuccess={handleEditSuccess}
                      >
                        <div className="flex items-center gap-2 w-full px-4 py-3 rounded-none h-auto body-s text-black hover:bg-gray-100 transition-colors border-0 border-b border-b-gray-200">
                          <EditIcon className="size-5" />
                          <span>Редактировать</span>
                        </div>
                      </EditEmployeeButton>
                      <Button
                        variant="ghost"
                        size="default"
                        onClick={handleArchive}
                        className="flex items-center gap-2 w-full px-4 py-3 rounded-none h-auto body-s text-red-600 font-normal hover:bg-gray-100 transition-colors border-0"
                      >
                        <ArchiveIcon className="size-5" />
                        <span>Архивировать</span>
                      </Button>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
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
