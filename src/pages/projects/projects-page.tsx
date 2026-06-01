import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { SelectedEmployee } from "@/entities/employee/ui/selected-employee.tsx";
import { employees } from "@/entities/employee";

const ProjectsPage = () => {
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
      <div className="p-6">
        {employees.map((employee) => (
          <SelectedEmployee
            key={employee.id}
            name={employee.full_name}
            job={employee.job_title}
            photo={employee.photo_url}
          />
        ))}
      </div>
    </div>
  );
};

export const Component = ProjectsPage;
