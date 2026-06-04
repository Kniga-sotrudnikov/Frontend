import { PageHeader } from "@/widgets/page-header";
import { SearchInput } from "@/shared/ui/input";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { Navbar, orgTree } from "@/widgets/navbar";
import { EmployeesList } from "@/widgets/employees-list";
import { EmployeesFilterBar } from "@/widgets/employees-filter-bar";
import { VacancyCard } from "@/widgets/vacancy-card";
import { useVacancyModalStore } from "@/features/vacancy-respond";
import { mockEmployees, mockFavorites, mockVacancies } from "./mocks/mocks";

const EmployeesPage = () => {
  const selectedVacancy = useVacancyModalStore((state) => state.selectedVacancy);
  const closeModal = useVacancyModalStore((state) => state.closeModal);

  return (
    <>
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
      
      {selectedVacancy && (
        <VacancyCard
          open={true}
          onOpenChange={(open) => { if (!open) closeModal(); }}
          vacancy={{
            id: selectedVacancy.id,
            title: selectedVacancy.profession,
            location: selectedVacancy.city,
            employmentDetails: [],
            franchise: selectedVacancy.franchise,
            department: selectedVacancy.department,
            description: selectedVacancy.position,
            responsibilities: [],
            competencies: [],
          }}
          onRespond={() => {}}
          onExportPDF={() => {}}
        />
      )}
    </>   
  );
};

export const Component = EmployeesPage;
