import { EmployeeCard } from "@/widgets/employee-card";
import { EmployeePrimaryInfo } from "@/entities/employee/ui/employee-primary-info";
import { ProfessionCard } from "@/widgets/profession-card";
import { EmptyPlaceholder } from "@ui/empty-placeholder";
import type { EmployeesListType } from "./types";

interface FavoritesTabProps {
  favorites: EmployeesListType[];
  viewType: "grid" | "list";
}

export const FavoritesTab = ({ favorites, viewType }: FavoritesTabProps) => {
  if (favorites.length === 0) {
    return <EmptyPlaceholder text="Нет избранных сотрудников или вакансий" />;
  }

  return (
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
        } else {
          const { id, ...vacancyProps } = item;
          return <ProfessionCard key={id} {...vacancyProps} />;
        }
      })}
    </div>
  );
};
