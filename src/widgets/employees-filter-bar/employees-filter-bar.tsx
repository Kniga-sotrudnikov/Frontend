import { Button } from "@/shared/ui/button";
import ExportIcon from "@/shared/assets/icons/export.svg?react";
import {
  StatusFilter,
  FilterCities,
  ExpertiseFilter,
  expertiseFilterGroups,
  citiesFilterOptions,
  useEmployeesPageStore,
} from "@/features/employee";
import { CreateEmployeeWrapper } from "@/features/create-employee";
import { useNotificationStore } from "@/shared/model/stores";

export const EmployeesFilterBar = () => {
  const viewType = useEmployeesPageStore((state) => state.viewType);
  const statusFilter = useEmployeesPageStore((state) => state.statusFilter);
  const citiesFilter = useEmployeesPageStore((state) => state.citiesFilter);
  const expertiseFilter = useEmployeesPageStore(
    (state) => state.expertiseFilter,
  );

  const setStatusFilter = useEmployeesPageStore(
    (state) => state.setStatusFilter,
  );
  const setExpertiseFilter = useEmployeesPageStore(
    (state) => state.setExpertiseFilter,
  );
  const setCitiesFilter = useEmployeesPageStore(
    (state) => state.setCitiesFilter,
  );
  const addNotification = useNotificationStore((state) => state.add);

  const onExportClick = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Требуется реализовать отправку запроса на экспорт данных",
    });
  };

  return (
    <div className="flex items-center gap-3 flex-nowrap">
      <StatusFilter value={statusFilter} onValueChange={setStatusFilter} />
      <FilterCities
        options={citiesFilterOptions}
        value={citiesFilter}
        onApply={setCitiesFilter}
      />
      <ExpertiseFilter
        groups={expertiseFilterGroups}
        value={expertiseFilter}
        onApply={setExpertiseFilter}
      />

      <div className="ml-auto" />
      
      <div className="flex items-center gap-3">
        {viewType === "list" && (
          <Button
            variant="outline"
            size="default"
            className="gap-2"
            onClick={onExportClick}
          >
            <ExportIcon className="size-5" />
            Экспортировать
          </Button>
        )}
        <CreateEmployeeWrapper />
      </div>
    </div>
  );
};
