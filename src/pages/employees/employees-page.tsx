import { PageHeader } from "@/widgets/page-header";
import { SearchInput } from "@/shared/ui/input";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { Navbar, orgTree } from "@/widgets/navbar";
import FilterCities from "@/widgets/filter-cities/filter-cities";

const EmployeesPage = () => {
  return (
    <div className="bg-gray-50 ">
      <PageHeader
        title="Книга сотрудников"
        stats={<span>144 сотрудников, 4 направления, 7 СИС</span>}
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        birthday={<BirthdaysPopover />}
        user={<HeaderUserCard name="Алексеева Виктория" position="HR-специалист" />}
      />
      <div className="mx-10 mt-5 grid grid-cols-[295px_1fr] gap-x-7 min-h-screen">
        <Navbar unitsList={orgTree} />
        <div className="columns-3xs">
          <FilterCities
          cities={["Москва","Омск","Орск","Орёл","Нальчик","Туктамыш"]}
        /></div>
      </div>
    </div>
  );
};

export const Component = EmployeesPage;