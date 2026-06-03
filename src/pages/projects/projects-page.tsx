import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { SelectedEmployeesList } from "@/widgets/selected-employees-list/selected-employees-list.tsx";
import { shortEmployees, type TShortEmployee } from "@/entities/employee";
import { useState } from "react";

const ProjectsPage = () => {
  const [selectedEmployees, setSelectedEmployees] =
    useState<TShortEmployee[]>(shortEmployees);

  const handleDeleteEmployee = (employeeId: number) => {
    setSelectedEmployees((prev) =>
      prev.filter((employee) => employee.id !== employeeId),
    );
  };

  return (
    <div>
      <PageHeader
        title="Проекты"
        search={<SearchInput placeholder="Найти проект" />}
        birthday={<BirthdaysPopover />}
        user={
          <HeaderUserCard name="Алексеева Виктория" position="HR-специалист" />
        }
      />
      <div className="p-2 w-full max-w-[700px] bg-white">
        <SelectedEmployeesList
          employees={selectedEmployees}
          onDelete={handleDeleteEmployee}
        />
      </div>
    </div>
  );
};

export const Component = ProjectsPage;
