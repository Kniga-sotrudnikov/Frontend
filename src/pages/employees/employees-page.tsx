import { PageHeader } from "@/widgets/page-header";
import { SearchInput } from "@/shared/ui/input";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { Navbar, orgTree } from "@/widgets/navbar";
import { EmployeesList } from "@/widgets/employees-list";
import { EmployeesFilterBar } from "@/widgets/employees-filter-bar";
import { mockEmployees, mockFavorites, mockVacancies } from "./mocks/mocks";

const EmployeesPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHeader
        title="Книга сотрудников"
        stats={<span>144 сотрудников, 4 направления, 7 СИС</span>}
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        birthday={<BirthdaysPopover />}
        user={
          <HeaderUserCard name="Алексеева Виктория" position="HR-специалист" />
        }
      />

      <div className="mx-10 mt-5 grid grid-cols-[295px_1fr] gap-x-7 min-h-screen">
        <Navbar unitsList={orgTree} />

        <div className="space-y-3">
          <EmployeesFilterBar />
          <EmployeesList
            employees={mockEmployees}
            vacancies={mockVacancies}
            favoritesIds={mockFavorites}
          />
        </div>
      </div>
    </div>
  );
};

export const Component = EmployeesPage;
