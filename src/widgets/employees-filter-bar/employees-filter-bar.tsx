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
import { employees } from "@/entities/employee/model/mock";

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

  const getTagUsageCount = (_groupKey: string, tagValue: string) => {
    const count = employees.filter(emp => {
      const hasInTags = emp.tags?.includes(tagValue) || false;
      const hasInCompetencies = emp.competencies?.includes(tagValue) || false;
      return hasInTags || hasInCompetencies;
    }).length;
    
    return count;
  };

  const getEmployeesByTag = (
    _groupKey: string,
    tagValue: string,
  ) => {
    const filtered = employees.filter(emp => {
      const hasInTags = emp.tags?.includes(tagValue) || false;
      const hasInCompetencies = emp.competencies?.includes(tagValue) || false;
      return hasInTags || hasInCompetencies;
    });
    
    return filtered.map(emp => ({
      name: emp.full_name,
      position: emp.job_title,
      photo: emp.photo_url,
    }));
  };

  const getAllEmployees = () => {
    return employees.map(emp => ({
      id: String(emp.id),
      name: emp.full_name,
      position: emp.job_title,
      photo: emp.photo_url,
    }));
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
        isAdmin={true}
        getTagUsageCount={getTagUsageCount}
        getEmployeesByTag={getEmployeesByTag}
        getAllEmployees={getAllEmployees}
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