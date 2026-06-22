import { PageHeader } from "@/widgets/page-header";
import { SearchInput } from "@/shared/ui/input";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { Navbar } from "@/widgets/navbar";
import { EmployeesList } from "@/widgets/employees-list";
import { EmployeesFilterBar } from "@/widgets/employees-filter-bar";
import { VacancyCard } from "@/widgets/vacancy-card";
import { useVacancyModalStore } from "@/features/vacancy-respond";
import { mockFavorites, mockVacancies } from "./mocks/mocks";
import {
  useEmployeesList,
  usePatchEmployee,
  type EmployeeData,
} from "@/entities/employee";
import { Skeleton } from "@/shared/ui/skeleton";

const EmployeesPage = () => {
  const selectedVacancy = useVacancyModalStore(
    (state) => state.selectedVacancy,
  );
  const closeModal = useVacancyModalStore((state) => state.closeModal);

  //TODO: Добавить логику передачи роли в хук
  const { data: listData, isLoading: isListLoading } = useEmployeesList();
  const employees = listData?.results ?? [];

  //TODO: Обработать сценарий если при редактировании происходит ошибка
  const { mutate: patchEmployee } = usePatchEmployee();

  //TODO: разобраться с недостающими полями и с несоответствием типов!
  // Согласовать обязательные поля с бекендом
  const handlePatchEmployee = (employee: EmployeeData) => {
    patchEmployee({
      id: employee.id,
      data: {
        full_name: employee.name,
        job_title: employee.position,
        email: employee.emailCorporate,
        phone: employee.phoneCorporate,
      },
    });
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <PageHeader
          title="Книга сотрудников"
          stats={<span>144 сотрудников, 4 направления, 7 СИС</span>}
          search={
            <SearchInput placeholder="Поиск по ФИО, должности, тегам..." />
          }
          birthday={<BirthdaysPopover />}
          user={<HeaderUserCard />}
        />

        <div className="mx-10 mt-5 grid grid-cols-[295px_1fr] gap-x-7 min-h-screen">
          <Navbar />

          <div className="space-y-3">
            <EmployeesFilterBar />
            {/* TODO: Подумать над тем чтобы поменять структуру и запросы на получение данных и скелетон засунуть внутрь компонентов а не брать и отображать тут */}
            {isListLoading ? (
              <Skeleton className="h-10 w-10"></Skeleton>
            ) : (
              <EmployeesList
                employees={employees}
                vacancies={mockVacancies}
                favoritesIds={mockFavorites}
                onUpdateEmployee={handlePatchEmployee}
              />
            )}
          </div>
        </div>
      </div>

      {selectedVacancy && (
        <VacancyCard
          open={true}
          onOpenChange={(open) => {
            if (!open) closeModal();
          }}
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
