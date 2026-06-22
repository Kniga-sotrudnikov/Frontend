import { EmployeeCard } from "@/widgets/employee-card";
import { EmployeePrimaryInfo } from "@/entities/employee/ui/employee-primary-info";
import { ProfessionCard } from "@/widgets/profession-card";
import { EmptyPlaceholder } from "@ui/empty-placeholder";
import type { EmployeesListType } from "./types";
import { type EmployeeData } from "@/entities/employee";
import { useVacancyModalStore } from "@/features/vacancy-respond";

interface RenderCardsProps {
  items: EmployeesListType[];
  emptyText: string;
  // TODO: убрать favoritesIds после подключения TanStack Query — получать из useFavoritesQuery()
  favoritesIds?: (number | string)[];
  canEditEmployee?: boolean;
  onToggleFavorite?: (id: number | string) => void;
  onUpdateEmployee?: (updatedEmployee: EmployeeData) => void;
  onEmployeeClick: (employee: EmployeeData) => void;
  onArchiveEmployee: (employee: EmployeeData) => void;
}

export const RenderCards = ({
  items,
  emptyText,
  favoritesIds = [],
  onToggleFavorite,
  canEditEmployee = false,
  onUpdateEmployee,
  onEmployeeClick,
  onArchiveEmployee,
}: RenderCardsProps) => {
  const openVacancyModal = useVacancyModalStore(
    (state) => state.openVacancyModal,
  );

  if (items.length === 0) {
    return <EmptyPlaceholder text={emptyText} />;
  }

  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(370px,1fr))]">
      {items.map((item) => {
        if ("name" in item && "linearManager" in item) {
          const employee = item as EmployeeData;
          return (
            <EmployeeCard
              onClick={() => onEmployeeClick(employee)}
              key={item.id}
              city={item.city}
              linearManager={item.linearManager}
              employeeData={employee}
              isFavorite={favoritesIds.includes(item.id)}
              canEdit={canEditEmployee}
              onFavorite={() => onToggleFavorite?.(item.id)}
              onUpdateEmployee={onUpdateEmployee}
              onArchive={() => onArchiveEmployee(employee)}
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
            onRespond={() => openVacancyModal(item)}
          />
        );
      })}
    </div>
  );
};
