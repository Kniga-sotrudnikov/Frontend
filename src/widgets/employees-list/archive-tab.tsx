import { EmployeeCard } from "@/widgets/employee-card";
import { EmployeePrimaryInfo } from "@/entities/employee/ui/employee-primary-info";
import { ProfessionCard } from "@/widgets/profession-card";
import { EmptyPlaceholder } from "@ui/empty-placeholder";
import type { EmployeesListType } from "./types";

interface ArchiveTabProps {
  archived: EmployeesListType[];
  viewType: "grid" | "list";
}

export const ArchiveTab = ({ archived, viewType }: ArchiveTabProps) => {
  if (archived.length === 0) {
    return <EmptyPlaceholder text="В архиве ничего нет" />;
  }

  return (
    <div
      className={
        viewType === "grid"
          ? "grid gap-6 grid-cols-[repeat(auto-fill,minmax(370px,1fr))]"
          : "flex flex-col gap-4"
      }
    >
      {archived.map((item) => {
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
