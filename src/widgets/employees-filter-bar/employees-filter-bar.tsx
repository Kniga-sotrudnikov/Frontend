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
import { getEmployeesListPublic } from "@/entities/employee";
import { useQuery } from "@tanstack/react-query";
import { useIsAdmin } from "@/entities/user";

const isTagObject = (tag: unknown): tag is { id: number; name?: string } => {
  return tag !== null && typeof tag === 'object' && 'id' in tag;
};

export const EmployeesFilterBar = () => {
  const viewType = useEmployeesPageStore((state) => state.viewType);
  const statusFilter = useEmployeesPageStore((state) => state.statusFilter);
  const citiesFilter = useEmployeesPageStore((state) => state.citiesFilter);
  const expertiseFilter = useEmployeesPageStore(
    (state) => state.expertiseFilter,
  );

  const isAdmin = useIsAdmin();

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

  const { data: employeesData } = useQuery({
    queryKey: ["employees-raw", 100, 0],
    queryFn: () => getEmployeesListPublic({ limit: 100, offset: 0 }),
  });

  const employees = employeesData?.results || [];

  const onExportClick = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Требуется реализовать отправку запроса на экспорт данных",
    });
  };

  const hasTag = (emp: typeof employees[0], tagId: number): boolean => {
    if (!emp.tags || emp.tags.length === 0) return false;
    
    for (const tag of emp.tags) {
      if (isTagObject(tag)) {
        if (tag.id === tagId) return true;
      }
      if (typeof tag === 'string' && tag === String(tagId)) {
        return true;
      }
    }
    return false;
  };

  const getTagUsageCount = (tagId: number) => {
    const count = employees.filter((emp) => {
      const hasTagInTags = hasTag(emp, tagId);
      const hasInCompetencies = emp.competencies?.includes(String(tagId)) || false;
      return hasTagInTags || hasInCompetencies;
    }).length;

    return count;
  };

  const getEmployeesByTag = (tagId: number) => {
    const filtered = employees.filter((emp) => {
      const hasTagInTags = hasTag(emp, tagId);
      const hasInCompetencies = emp.competencies?.includes(String(tagId)) || false;
      return hasTagInTags || hasInCompetencies;
    });

    return filtered.map((emp) => ({
      id: String(emp.id),
      name: emp.full_name,
      position: emp.job_title,
      photo: emp.photo_url || undefined,
    }));
  };

  const getAllEmployees = () => {
    return employees.map((emp) => ({
      id: String(emp.id),
      name: emp.full_name,
      position: emp.job_title,
      photo: emp.photo_url || undefined,
    }));
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
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
        isAdmin={isAdmin}
        getTagUsageCount={getTagUsageCount}
        getEmployeesByTag={getEmployeesByTag}
        getAllEmployees={getAllEmployees}
      />

      <div className="hidden flex-1 min-[1150px]:block" />

      <div className="flex items-center gap-3">
        {viewType === "list" && (
          <Button
            variant="outline"
            size="default"
            className="gap-2 max-[1100px]:size-8 max-[1100px]:w-24 max-[1100px]:gap-0 max-[1100px]:px-0"
            onClick={onExportClick}
          >
            <ExportIcon className="size-5" />
            <span className="max-[1100px]:sr-only">Экспортировать</span>
          </Button>
        )}
        {isAdmin && (
          <CreateEmployeeWrapper
            buttonClassName={
              viewType === "list"
                ? "max-[1100px]:size-8 max-[1100px]:w-24 max-[1100px]:gap-0 max-[1100px]:px-0"
                : undefined
            }
            hideButtonLabelOnCompact={viewType === "list"}
          />
        )}
      </div>
    </div>
  );
};