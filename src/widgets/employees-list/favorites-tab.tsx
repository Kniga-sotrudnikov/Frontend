import { EmployeeCard } from "@/widgets/employee-card";
import { EmployeePrimaryInfo } from "@/entities/employee/ui/employee-primary-info";
import { ProfessionCard } from "@/widgets/profession-card";
import { EmptyPlaceholder } from "@ui/empty-placeholder";
import { VacancyCard } from "@/widgets/vacancy-card";
import { useState } from "react";
import type { EmployeesListType, VacancyData } from "./types";

interface FavoritesTabProps {
  favorites: EmployeesListType[];
  viewType: "grid" | "list";
}

export const FavoritesTab = ({ favorites, viewType }: FavoritesTabProps) => {
  const [selectedVacancy, setSelectedVacancy] = useState<VacancyData | null>(
    null,
  );

  if (favorites.length === 0) {
    return <EmptyPlaceholder text="Нет избранных сотрудников или вакансий" />;
  }

  return (
    <>
      <div
        className={
          viewType === "grid"
            ? "grid grid-cols-1 gap-6 min-[1300px]:grid-cols-2"
            : "flex flex-col gap-4"
        }
      >
        {favorites.map((item) => {
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
          }

          return (
            <ProfessionCard
              key={item.id}
              city={item.city}
              profession={item.profession}
              position={item.position}
              franchise={item.franchise}
              department={item.department}
              isArchived={item.isArchived}
              onRespond={() => setSelectedVacancy(item)}
            />
          );
        })}
      </div>

      {selectedVacancy && (
        <VacancyCard
          open={!!selectedVacancy}
          onOpenChange={(open) => {
            if (!open) setSelectedVacancy(null);
          }}
          vacancy={{
            id: selectedVacancy.id,
            title: selectedVacancy.profession,
            location: selectedVacancy.city,
            employmentDetails: [],
            franchise: selectedVacancy.franchise,
            department: selectedVacancy.department,
            description: selectedVacancy.position,
            responsibilities: [],
            competencies: [],
          }}
          onRespond={() => {}}
          onExportPDF={() => {}}
        />
      )}
    </>
  );
};
