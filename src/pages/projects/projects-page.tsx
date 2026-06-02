import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { SelectedEmployeesList } from "@/widgets/selected-employees-list/selected-employees-list.tsx";
import { shortEmployees } from "@/entities/employee";

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
        <SelectedEmployeesList employees={shortEmployees} />
      </div>
    </div>
  );
};

export const Component = ProjectsPage;
