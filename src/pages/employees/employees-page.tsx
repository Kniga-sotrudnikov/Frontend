import { PageHeader } from "@/widgets/page-header";
import { SearchInput } from "@/shared/ui/input";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";

const EmployeesPage = () => {
  return (
    <div>
      <PageHeader
        title="Книга сотрудников"
        stats={<span>144 сотрудников, 4 направления, 7 СИС</span>}
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        birthday={<BirthdaysPopover />}
        user={<HeaderUserCard name="Алексеева Виктория" position="HR-специалист" />}
      />
      <div className="p-6">Сотрудники. В работе...</div>
    </div>
  );
};

export const Component = EmployeesPage;