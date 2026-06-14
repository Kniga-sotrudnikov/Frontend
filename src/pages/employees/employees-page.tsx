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
  useEmployeeDetailAdmin,
  useEmployeesListAdmin,
} from "@/entities/employee";
import { Skeleton } from "@/shared/ui/skeleton";
import { useAuthStore } from "@/entities/user";
import { useMemo } from "react";

const EmployeesPage = () => {
  const selectedVacancy = useVacancyModalStore(
    (state) => state.selectedVacancy,
  );
  const closeModal = useVacancyModalStore((state) => state.closeModal);

  const employeeId = useAuthStore((s) => s.user?.employee_id ?? undefined);

  //TODO: Разобраться что показывать в карточке если у пользователя нет карточки
  const { data: employeeDetail, isLoading: isDetailLoading } =
    useEmployeeDetailAdmin(employeeId);
  const { data } = useEmployeesListAdmin();

  //Маппинг данных с бека так как типы данных не совпадают
  const mockEmployees = useMemo(() => {
    if (!data?.results) return [];

    return data?.results.map((data) => ({
      id: data.id ?? "Example",
      name: data.full_name ?? "Example",
      position: data.job_title ?? "Example",
      department: data.department_name ?? "Example",
      franchise: data.direction_name ?? "Example",
      status: "working" as const,
      photo: data.photo_url ?? undefined,
      city: "Example",
      linearManager: "Example",
      isArchived: false,
      emailCorporate: "example@test.test",
      emailPersonal: "example@test.test",
      phoneCorporate: "87777777777",
      phonePersonal: "87777777777",
      birthday: "1111-11-11",
      competencies: data.tags.map((t) => t.name),
    }));
  }, [data?.results]);

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
          user={
            isDetailLoading ? (
              <Skeleton className="h-15 w-[247px]"></Skeleton>
            ) : (
              <HeaderUserCard
                name={employeeDetail?.full_name || "Ошибка: проверить данные"}
                position={
                  employeeDetail?.job_title || "Ошибка: проверить данные"
                }
                avatar={employeeDetail?.photo_url ?? undefined}
              />
            )
          }
        />

        <div className="mx-10 mt-5 grid grid-cols-[295px_1fr] gap-x-7 min-h-screen">
          <Navbar />

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
