import { EmployeeCard } from "@/widgets/employee-card";
import { EmployeePrimaryInfo } from "@/entities/employee/ui/employee-primary-info";
import { EmptyPlaceholder } from "@ui/empty-placeholder";
import type { EmployeeData } from "./types";

interface EmployeesTabProps {
  employees: EmployeeData[];
  viewType: "grid" | "list";
}

export const EmployeesTab = ({ employees, viewType }: EmployeesTabProps) => {
  const activeEmployees = employees.filter((emp) => !emp.isArchived);

  if (activeEmployees.length === 0) {
    return <EmptyPlaceholder text="Нет активных сотрудников" />;
  }

  return (
    <div
      className={
        viewType === "grid"
          ? "grid grid-cols-1 gap-6 min-[1300px]:grid-cols-2"
          : "flex flex-col gap-4"
      }
    >
      {activeEmployees.map((employee) => (
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
  );
};
