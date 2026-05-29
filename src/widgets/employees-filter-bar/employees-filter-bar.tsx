import { Button } from "@/shared/ui/button";
import ExportIcon from "@/shared/assets/icons/export.svg?react";
import { StatusFilter, useEmployeesPageStore } from "@/features/employee";
import { FilterCities } from "@/features/filter-cities";
import { CreateEmployeeWrapper } from "@/features/create-employee";
import { useNotificationStore } from "@/shared/model/stores";

export const EmployeesFilterBar = () => {
  const viewType = useEmployeesPageStore((state) => state.viewType);
  const statusFilter = useEmployeesPageStore((state) => state.statusFilter);
  const setStatusFilter = useEmployeesPageStore((state) => state.setStatusFilter);
  const addNotification = useNotificationStore((state) => state.add);

  const onExportClick = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Требуется реализовать отправку запроса на экспорт данных",
    });
  };

  return (
    <div className="flex items-center gap-3">
      <StatusFilter value={statusFilter} onValueChange={setStatusFilter} />
      <FilterCities cities={["Москва", "Сочи"]} />
      {/* TODO: добавить фильтр С чем обратиться */}
      <div className="ml-auto flex items-center gap-3">
        {viewType === "list" && (
          <Button variant="outline" size="default" className="gap-2" onClick={onExportClick}>
            <ExportIcon className="size-5" />
            Экспортировать
          </Button>
        )}
        <CreateEmployeeWrapper />
      </div>
    </div>
  );
};
