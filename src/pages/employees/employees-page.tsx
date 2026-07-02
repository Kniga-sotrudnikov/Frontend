import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { PageHeader } from "@/widgets/page-header";
import { SearchInput } from "@/shared/ui/input";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { Navbar } from "@/widgets/navbar";
import { EmployeesList } from "@/widgets/employees-list";
import { EmployeesFilterBar } from "@/widgets/employees-filter-bar";
import { VacancyCard } from "@/widgets/vacancy-card";
import { useVacancyModalStore } from "@/features/vacancy-respond";
import {
  useEmployeesList,
  usePatchEmployee,
  type EmployeeData,
} from "@/entities/employee";
import { useEmployeeModalStore } from "@/features/employee";
import { AppPagination } from "@ui/pagination";
import { useGetVacancyDetail } from "@/entities/vacancy";

const EMPLOYEES_LIMIT_OPTIONS = [6, 12, 24, 50];
const DEFAULT_EMPLOYEE_LIMIT = 12;

const EmployeesPage = () => {
  const { selectedVacancy, openVacancyModal, closeVacancyModal } =
    useVacancyModalStore(
      useShallow((state) => ({
        selectedVacancy: state.selectedVacancy,
        openVacancyModal: state.openVacancyModal,
        closeVacancyModal: state.closeVacancyModal,
      })),
    );
  const openEmployeeModal = useEmployeeModalStore(
    (state) => state.openEmployeeModal,
  );

  const [limit, setLimit] = useState(DEFAULT_EMPLOYEE_LIMIT);
  const [offset, setOffset] = useState(0);
  const [vacancyIdFromUrl, setVacancyIdFromUrl] = useState<number | null>(null);

  //TODO: Добавить логику передачи роли в хук
  const { data: listData, isLoading: isListLoading } = useEmployeesList(
    limit,
    offset,
  );
  const { data: vacancyDetailFromUrl } = useGetVacancyDetail(
    vacancyIdFromUrl ?? 0,
  );

  const totalCount = listData?.count ?? 0;
  const page = Math.floor(offset / limit) + 1;

  const employees = useMemo(() => {
    return listData?.results ?? [];
  }, [listData?.results]);

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vacancyId = params.get("vacancy");
    const employeeId = params.get("employee");

    if (vacancyId) {
      setVacancyIdFromUrl(Number(vacancyId));
    }

    if (employeeId) {
      const employee = employees.find((e) => String(e.id) === employeeId);
      if (employee) openEmployeeModal(employee);
    }
  }, [employees, openEmployeeModal]);

  useEffect(() => {
    if (vacancyDetailFromUrl) {
      openVacancyModal(vacancyDetailFromUrl);
    }
  }, [vacancyDetailFromUrl, openVacancyModal]);

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
            <EmployeesList
              employees={employees}
              onUpdateEmployee={handlePatchEmployee}
              isLoading={isListLoading}
              skeletonCount={limit}
            />

            <div>
              {listData && (
                <AppPagination
                  page={page}
                  limit={limit}
                  totalCount={totalCount}
                  limitOptions={EMPLOYEES_LIMIT_OPTIONS}
                  onPageChange={(nextPage) => setOffset((nextPage - 1) * limit)}
                  onLimitChange={(nextLimit) => {
                    setLimit(nextLimit);
                    setOffset(0);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedVacancy && (
        <VacancyCard
          open={true}
          onOpenChange={(open) => {
            if (!open) closeVacancyModal();
          }}
          vacancy={{
            id: selectedVacancy.id,
            title: selectedVacancy.title,
            location: selectedVacancy.location,
            employmentDetails: selectedVacancy.employmentDetails,
            franchise: selectedVacancy.franchise,
            department: selectedVacancy.department,
            description: selectedVacancy.description,
            responsibilities: selectedVacancy.responsibilities,
            competencies: selectedVacancy.competencies,
          }}
          onRespond={() => {}}
          onExportPDF={() => {}}
        />
      )}
    </>
  );
};

export const Component = EmployeesPage;
