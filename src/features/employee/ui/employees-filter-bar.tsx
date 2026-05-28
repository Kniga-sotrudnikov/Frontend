import { Button } from "@/shared/ui/button";
import ExportIcon from "@/shared/assets/icons/export.svg?react";
import { StatusFilter } from "./status-filter";
import { useEmployeesUIStore } from "../model/use-employees-ui-store";
import { useNotificationStore } from "@/shared/model/stores";

export const EmployeesFilterBar = () => {
  const viewType = useEmployeesUIStore((state) => state.viewType);
  const statusFilter = useEmployeesUIStore((state) => state.statusFilter);
  const setStatusFilter = useEmployeesUIStore((state) => state.setStatusFilter);
  const addNotification = useNotificationStore((state) => state.add);

  const onExportClick = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Требуется реализовать отправку запроса на экспорт данных",
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <StatusFilter value={statusFilter} onValueChange={setStatusFilter} />
      </div>
      {viewType === "list" && (
        <Button variant="outline" className="gap-3" onClick={onExportClick}>
          <ExportIcon className="size-4" />
          Экспортировать
        </Button>
      )}
    </div>
  );
};
