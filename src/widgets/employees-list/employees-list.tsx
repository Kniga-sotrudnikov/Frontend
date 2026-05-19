import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { EmployeeCard } from "@/widgets/employee-card";
import { EmployeePrimaryInfo } from "@/entities/employee/ui/employee-primary-info";
import { ProfessionCard } from "@/widgets/profession-card";
import { cn } from "@/shared/lib";
import GridIcon from "@/shared/assets/icons/grid.svg?react";
import ListIcon from "@/shared/assets/icons/list.svg?react";

interface EmployeeData {
  id: number | string;
  city: string;
  linearManager: string;
  name: string;
  position: string;
  franchise: string;
  department: string;
  status: "working" | "bizTrip" | "vacation" | "sick";
  photo?: string;
  isArchived?: boolean;
}

interface VacancyData {
  id: number | string;
  city: string;
  profession: string;
  position: string;
  franchise: string;
  department: string;
  isArchived?: boolean;
}

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
    "employees" | "vacancies" | "favorites"
  >("employees");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const favoriteEmployees = employees.filter((emp) =>
    favoritesIds.includes(emp.id),
  );

  const favoriteVacancies = vacancies.filter((vac) =>
    favoritesIds.includes(vac.id),
  );

  const allFavorites = [...favoriteEmployees, ...favoriteVacancies];

  const counts = {
    employees: employees.length,
    vacancies: vacancies.length,
    favorites: allFavorites.length,
  };

  return (
    <div className="max-w-235">
      <div className="flex justify-between items-center mb-3">
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "employees" | "vacancies" | "favorites")
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
          </TabsList>
        </Tabs>

        <div className="flex rounded-8 h-8">
          <button
            onClick={() => setViewType("grid")}
            className={cn(
              "py-1.5 px-2 cursor-pointer rounded-l-8",
              viewType === "grid"
                ? "bg-purple-50 border border-purple-100"
                : "bg-white border-y border-l border-gray-200",
              viewType !== "grid" && "border-r-0",
            )}
          >
            <GridIcon className="size-5" />
          </button>
          <button
            onClick={() => setViewType("list")}
            className={cn(
              "py-1.5 px-2 cursor-pointer rounded-r-8",
              viewType === "list"
                ? "bg-purple-50 border border-purple-100"
                : "bg-white border-y border-r border-gray-200",
              viewType !== "list" && "border-l-0",
            )}
          >
            <ListIcon className="size-5" />
          </button>
        </div>
      </div>

      {activeTab === "employees" && (
        <div className="grid grid-cols-1 gap-6 min-[1300px]:grid-cols-2">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              city={employee.city}
              linearManager={employee.linearManager}
              primaryInfo={
                <EmployeePrimaryInfo
                  name={employee.name}
                  position={employee.position}
                  franchise={employee.franchise}
                  department={employee.department}
                  status={employee.status}
                  photo={employee.photo}
                  isArchived={employee.isArchived}
                />
              }
            />
          ))}
        </div>
      )}

      {activeTab === "vacancies" && (
        <div className="grid grid-cols-1 gap-6 min-[1300px]:grid-cols-2">
          {vacancies.map(({ id, ...vacancyProps }) => (
            <ProfessionCard key={id} {...vacancyProps} />
          ))}
        </div>
      )}

      {activeTab === "favorites" && (
        <>
          {allFavorites.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 min-[1300px]:grid-cols-2">
              {allFavorites.map((item) => {
                if ("name" in item && "linearManager" in item) {
                  return (
                    <EmployeeCard
                      key={item.id}
                      city={item.city}
                      linearManager={item.linearManager}
                      primaryInfo={
                        <EmployeePrimaryInfo
                          name={item.name}
                          position={item.position}
                          franchise={item.franchise}
                          department={item.department}
                          status={item.status}
                          photo={item.photo}
                          isArchived={item.isArchived}
                        />
                      }
                    />
                  );
                } else {
                  const { id, ...vacancyProps } = item;
                  return <ProfessionCard key={id} {...vacancyProps} />;
                }
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Нет избранных сотрудников или вакансий
            </div>
          )}
        </>
      )}
    </div>
  );
};
