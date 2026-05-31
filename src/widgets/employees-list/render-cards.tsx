import { EmployeeCard } from "@/widgets/employee-card";
import { EmployeePrimaryInfo } from "@/entities/employee/ui/employee-primary-info";
import { ProfessionCard } from "@/widgets/profession-card";
import { EmptyPlaceholder } from "@ui/empty-placeholder";
import type { EmployeesListType } from "./types";
import type { EmployeeData } from "@/entities/employee";

interface RenderCardsProps {
  items: EmployeesListType[];
  emptyText: string;
  // TODO: убрать favoritesIds после подключения TanStack Query — получать из useFavoritesQuery()
  favoritesIds?: (number | string)[];
  onToggleFavorite?: (id: number | string) => void;
  onUpdateEmployee?: (updatedEmployee: EmployeeData) => void;
}

export const RenderCards = ({
  items,
  emptyText,
  favoritesIds = [],
  onToggleFavorite,
  onUpdateEmployee,
}: RenderCardsProps) => {
  if (items.length === 0) {
    return <EmptyPlaceholder text={emptyText} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 min-[1300px]:grid-cols-2">
      {items.map((item) => {
        if ("name" in item && "linearManager" in item) {
          const employee = item as EmployeeData
          return (
            <EmployeeCard
              key={item.id}
              city={item.city}
              linearManager={item.linearManager}
              employeeData={employee}
              isFavorite={favoritesIds.includes(item.id)}
              onFavorite={() => onToggleFavorite?.(item.id)}
              onUpdateEmployee={onUpdateEmployee}
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

        const { id, ...vacancyProps } = item;
        return (
          <ProfessionCard
            key={id}
            {...vacancyProps}
            isFavorite={favoritesIds.includes(id)}
            onFavorite={() => onToggleFavorite?.(id)}
          />
        );
      })}
    </div>
  );
};
