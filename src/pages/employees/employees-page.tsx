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
import { useAuthStore } from "@/entities/user";
import { useSummaryStats } from "@/entities/org-structure";
import { pluralize } from "@/shared/lib";

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

  const currentUser = useAuthStore((state) => state.user);
  const currentEmployeeId = currentUser?.employee_id;

  const { data: listData, isLoading: isListLoading } = useEmployeesList(
    limit,
    offset,
  );
  const { data: vacancyDetailFromUrl } = useGetVacancyDetail(
    vacancyIdFromUrl ?? 0,
  );
  const { data: summaryData, isLoading: isSummaryLoading } = useSummaryStats();

  const totalCount = (listData?.count ?? 0) - (currentEmployeeId ? 1 : 0);
  const page = Math.floor(offset / limit) + 1;

  const employees = useMemo(() => {
    return listData?.results ?? [];
  }, [listData?.results]);

  const statsText = useMemo(() => {
    if (isSummaryLoading) return "Загрузка...";
    if (!summaryData) return "Нет данных";

    // TODO: #45 Заменить "вакансий" на "СИС" после добавления соответствующего поля в API
    // Сейчас API возвращает vacancies_count, но в дизайне отображается "СИС"
    // Нужно будет обновить после доработки бекенда
    const employees = pluralize(
      summaryData.employees_count,
      "сотрудник",
      "сотрудника",
      "сотрудников",
    );
    const directions = pluralize(
      summaryData.directions_count,
      "направление",
      "направления",
      "направлений",
    );
    const vacancies = pluralize(
      summaryData.vacancies_count,
      "вакансия",
      "вакансии",
      "вакансий",
    );

    return `${summaryData.employees_count} ${employees}, ${summaryData.directions_count} ${directions}, ${summaryData.vacancies_count} ${vacancies}`;
  }, [summaryData, isSummaryLoading]);

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
      <div className="flex h-full min-h-0 flex-col bg-gray-50">
        <PageHeader
          title="Книга сотрудников"
          stats={<span>{statsText}</span>}
          search={
            <SearchInput placeholder="Поиск по ФИО, должности, тегам..." />
          }
          birthday={<BirthdaysPopover />}
          user={<HeaderUserCard />}
        />

        <div className="grid min-h-0 flex-1 grid-cols-[295px_minmax(0,1fr)] gap-x-7 px-10 pt-5 max-[1100px]:px-5">
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
