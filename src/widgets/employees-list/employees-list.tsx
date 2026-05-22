import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { cn } from "@/shared/lib";
import GridIcon from "@/shared/assets/icons/grid.svg?react";
import ListIcon from "@/shared/assets/icons/list.svg?react";
import { Button } from "@/shared/ui/button";
import { EmployeesTab } from "./employees-tab";
import { VacanciesTab } from "./vacancies-tab";
import { FavoritesTab } from "./favorites-tab";
import { ArchiveTab } from "./archive-tab";
import type { EmployeeData, VacancyData } from "./types";

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
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

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

  const counts = {
    employees: employees.filter((emp) => !emp.isArchived).length,
    vacancies: vacancies.filter((vac) => !vac.isArchived).length,
    favorites: allFavorites.length,
    archived: allArchived.length,
  };

  return (
    <div className="max-w-235">
      <div className="flex justify-between items-center mb-3">
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(
              value as "employees" | "vacancies" | "favorites" | "archive",
            )
          }
        >
          <TabsList variant="line" className="gap-0 p-0 h-auto">
            <TabsTrigger
              value="employees"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Сотрудники
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {counts.employees}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="vacancies"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Вакансии
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {counts.vacancies}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Избранное
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {counts.favorites}
              </span>
            </TabsTrigger>
            {/* TODO: добавить проверку на роль HR */}
            <TabsTrigger
              value="archive"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Архив
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {counts.archived}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex rounded-8 h-8 overflow-hidden">
          <Button
            variant="plain"
            size="plain"
            onClick={() => setViewType("grid")}
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

      {activeTab === "employees" && (
        <EmployeesTab employees={employees} viewType={viewType} />
      )}

      {activeTab === "vacancies" && (
        <VacanciesTab vacancies={vacancies} viewType={viewType} />
      )}

      {activeTab === "favorites" && (
        <FavoritesTab favorites={allFavorites} viewType={viewType} />
      )}

      {activeTab === "archive" && (
        <ArchiveTab archived={allArchived} viewType={viewType} />
      )}
    </div>
  );
};
