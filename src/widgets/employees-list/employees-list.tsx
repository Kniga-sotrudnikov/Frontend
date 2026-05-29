import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { cn } from "@/shared/lib";
import GridIcon from "@/shared/assets/icons/grid.svg?react";
import ListIcon from "@/shared/assets/icons/list.svg?react";
import { Button } from "@/shared/ui/button";
import type { EmployeeData, VacancyData } from "./types";
import { RenderCards } from "./render-cards";
import { DataTable } from "@/shared/ui/table/data-table";
import { getEmployeeColumns, getVacancyColumns } from "./employee-columns";
import { useNotificationStore } from "@/shared/model/stores";
import { useEmployeesPageStore } from "@/features/employee";

interface EmployeesListProps {
  employees: EmployeeData[];
  vacancies: VacancyData[];
  favoritesIds?: (number | string)[];
}

export const EmployeesList = ({
  employees,
  vacancies,
  favoritesIds = [],
}: EmployeesListProps) => {
  const [activeTab, setActiveTab] = useState<
    "employees" | "vacancies" | "favorites" | "archive"
  >("employees");
  const viewType = useEmployeesPageStore((state) => state.viewType);
  const setViewType = useEmployeesPageStore((state) => state.setViewType);
  const addNotification = useNotificationStore((state) => state.add);

  const favoriteEmployees = employees.filter(
    (emp) => favoritesIds.includes(emp.id) && !emp.isArchived,
  );

  const favoriteVacancies = vacancies.filter(
    (vac) => favoritesIds.includes(vac.id) && !vac.isArchived,
  );

  const allFavorites = [...favoriteEmployees, ...favoriteVacancies];

  const archivedEmployees = employees.filter((emp) => emp.isArchived === true);
  const archivedVacancies = vacancies.filter((vac) => vac.isArchived === true);
  const allArchived = [...archivedEmployees, ...archivedVacancies];

  const tabContentMap = {
    employees: employees.filter((emp) => !emp.isArchived),
    vacancies: vacancies.filter((vac) => !vac.isArchived),
    favorites: allFavorites,
    archive: allArchived,
  };

  const emptyTextMap = {
    employees: "Нет активных сотрудников",
    vacancies: "Нет активных вакансий",
    favorites: "Нет избранных сотрудников или вакансий",
    archive: "В архиве ничего нет",
  };

  const itemsByTab = tabContentMap[activeTab];
  const emptyText = emptyTextMap[activeTab];
  const handleToggleFavorite = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Требуется реализовать добавление в Избранное",
    });
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            const tab = value as "employees" | "vacancies" | "favorites" | "archive";
            setActiveTab(tab);
            if (tab === "favorites" || tab === "archive") setViewType("grid");
          }}
        >
          <TabsList variant="line" className="gap-0 p-0 h-auto">
            <TabsTrigger
              value="employees"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Сотрудники
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {tabContentMap.employees.length}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="vacancies"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Вакансии
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {tabContentMap.vacancies.length}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Избранное
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {tabContentMap.favorites.length}
              </span>
            </TabsTrigger>
            {/* TODO: добавить проверку на роль HR */}
            <TabsTrigger
              value="archive"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Архив
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {tabContentMap.archive.length}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex rounded-8 h-8 overflow-hidden">
          <Button
            variant="plain"
            size="plain"
            onClick={() => setViewType("grid")}
            disabled={activeTab === "favorites" || activeTab === "archive"}
            className={cn(
              "py-1.5 px-2 rounded-none rounded-l-8 h-full transition-none",
              viewType === "grid"
                ? "bg-purple-50 border border-purple-100"
                : "bg-white border-y border-l border-gray-200",
              viewType !== "grid" && "border-r-0",
            )}
          >
            <GridIcon className="size-5" />
          </Button>
          <Button
            variant="plain"
            size="plain"
            onClick={() => setViewType("list")}
            disabled={activeTab === "favorites" || activeTab === "archive"}
            className={cn(
              "py-1.5 px-2 rounded-none rounded-r-8 h-full transition-none",
              viewType === "list"
                ? "bg-purple-50 border border-purple-100"
                : "bg-white border-y border-r border-gray-200",
              viewType !== "list" && "border-l-0",
            )}
          >
            <ListIcon className="size-5" />
          </Button>
        </div>
      </div>

      {viewType === "list" && activeTab === "employees" ? (
        <DataTable columns={getEmployeeColumns(favoritesIds, handleToggleFavorite)} data={tabContentMap.employees} />
      ) : viewType === "list" && activeTab === "vacancies" ? (
        <DataTable columns={getVacancyColumns(favoritesIds, handleToggleFavorite)} data={tabContentMap.vacancies} />
      ) : (
        <RenderCards items={itemsByTab} emptyText={emptyText} favoritesIds={favoritesIds} onToggleFavorite={handleToggleFavorite} />
      )}
    </div>
  );
};
