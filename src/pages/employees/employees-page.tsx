import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { PageHeader } from "@/widgets/page-header";
import { SearchInput } from "@/shared/ui/input";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { Navbar } from "@/widgets/navbar";
import {
  EmployeesList,
  type EmployeesListEntityTab,
  type EmployeesListTab,
} from "@/widgets/employees-list";
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
import {
  useSelectionUnitStore,
  useSummaryStats,
} from "@/entities/org-structure";
import { selectedUnitToFilter } from "./lib/selected-unit-to-filter";
import { useGetVacancies, useGetVacancyDetail } from "@/entities/vacancy";
import { useAuthStore } from "@/entities/user";
import { pluralize } from "@/shared/lib";
import { useGetFavorites } from "@/entities/favorites";

const EMPLOYEES_LIMIT_OPTIONS = [6, 12, 24, 50];
const DEFAULT_EMPLOYEE_LIMIT = 12;
const VACANCIES_LIMIT_OPTIONS = EMPLOYEES_LIMIT_OPTIONS;
const DEFAULT_VACANCY_LIMIT = DEFAULT_EMPLOYEE_LIMIT;
const FAVORITES_LIMIT_OPTIONS = EMPLOYEES_LIMIT_OPTIONS;
const DEFAULT_FAVORITE_LIMIT = DEFAULT_EMPLOYEE_LIMIT;

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

  const [activeTab, setActiveTab] = useState<EmployeesListTab>("employees");
  const [activeEntityTab, setActiveEntityTab] =
    useState<EmployeesListEntityTab>("employees");
  const [employeeLimit, setEmployeeLimit] = useState(DEFAULT_EMPLOYEE_LIMIT);
  const [employeeOffset, setEmployeeOffset] = useState(0);
  const [vacancyLimit, setVacancyLimit] = useState(DEFAULT_VACANCY_LIMIT);
  const [vacancyOffset, setVacancyOffset] = useState(0);
  const [favoriteLimit, setFavoriteLimit] = useState(DEFAULT_FAVORITE_LIMIT);
  const [favoriteOffset, setFavoriteOffset] = useState(0);
  const [selectedVacancyId, setSelectedVacancyId] = useState<number | null>(
    null,
  );

  const selectedUnit = useSelectionUnitStore((state) => state.selectedUnit);
  const setSelectedUnit = useSelectionUnitStore(
    (state) => state.setSelectedUnit,
  );
  const filter = useMemo(
    () => selectedUnitToFilter(selectedUnit),
    [selectedUnit],
  );

  // при смене выбранного узла возвращаемся на первую страницу
  useEffect(() => {
    setOffset(0);
  }, [selectedUnit]);

  // сброс выбранного узла при уходе со страницы
  useEffect(() => {
    return () => setSelectedUnit(null);
  }, [setSelectedUnit]);
  const currentUser = useAuthStore((state) => state.user);
  const currentEmployeeId = currentUser?.employee_id;

  const { data: listData, isLoading: isListLoading } = useEmployeesList(
    limit,
    offset,
    undefined,
    filter,
  );
  const { data: vacancyDetailFromUrl } = useGetVacancyDetail(
    vacancyIdFromUrl ?? 0,
    employeeLimit,
    employeeOffset,
  );
  const { data: summaryData, isLoading: isSummaryLoading } = useSummaryStats();
  const { data: vacanciesData, isLoading: isVacanciesLoading } =
    useGetVacancies({
      limit: vacancyLimit,
      offset: vacancyOffset,
    });
  const { data: favoritesData, isLoading: isFavoritesLoading } =
    useGetFavorites({
      limit: favoriteLimit,
      offset: favoriteOffset,
    });
  const { data: vacancyDetail } = useGetVacancyDetail(selectedVacancyId ?? 0);

  const employeeTotalCount = Math.max(
    (listData?.count ?? 0) - (currentEmployeeId ? 1 : 0),
    0,
  );
  const employeePage = Math.floor(employeeOffset / employeeLimit) + 1;
  const vacancyTotalCount = vacanciesData?.count ?? 0;
  const vacancyPage = Math.floor(vacancyOffset / vacancyLimit) + 1;
  const favoriteTotalCount = favoritesData?.count ?? 0;
  const favoritePage = Math.floor(favoriteOffset / favoriteLimit) + 1;

  const employees = useMemo(() => {
    return listData?.results ?? [];
  }, [listData?.results]);
  const vacancies = useMemo(() => {
    return vacanciesData?.results ?? [];
  }, [vacanciesData?.results]);
  const favoriteItems = useMemo(() => {
    return favoritesData?.results ?? [];
  }, [favoritesData?.results]);

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
      setSelectedVacancyId(Number(vacancyId));
    }

    if (employeeId) {
      const employee = employees.find((e) => String(e.id) === employeeId);
      if (employee) openEmployeeModal(employee);
    }
  }, [employees, openEmployeeModal]);

  useEffect(() => {
    if (vacancyDetail) {
      openVacancyModal(vacancyDetail);
    }
  }, [vacancyDetail, openVacancyModal]);

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
              activeTab={activeTab}
              onActiveTabChange={setActiveTab}
              activeEntityTab={activeEntityTab}
              onActiveEntityTabChange={setActiveEntityTab}
              employees={employees}
              vacancies={vacancies}
              favoriteItems={favoriteItems}
              employeesCount={employeeTotalCount}
              vacanciesCount={vacancyTotalCount}
              favoritesCount={favoriteTotalCount}
              onUpdateEmployee={handlePatchEmployee}
              onVacancyClick={(vacancy) => setSelectedVacancyId(vacancy.id)}
              isLoading={isListLoading}
              isVacanciesLoading={isVacanciesLoading}
              isFavoritesLoading={isFavoritesLoading}
              skeletonCount={employeeLimit}
              vacancySkeletonCount={vacancyLimit}
              favoriteSkeletonCount={favoriteLimit}
            />

            <div>
              {activeTab === "employees" && listData && (
                <AppPagination
                  page={employeePage}
                  limit={employeeLimit}
                  totalCount={employeeTotalCount}
                  limitOptions={EMPLOYEES_LIMIT_OPTIONS}
                  onPageChange={(nextPage) =>
                    setEmployeeOffset((nextPage - 1) * employeeLimit)
                  }
                  onLimitChange={(nextLimit) => {
                    setEmployeeLimit(nextLimit);
                    setEmployeeOffset(0);
                  }}
                />
              )}

              {activeTab === "vacancies" && vacanciesData && (
                <AppPagination
                  page={vacancyPage}
                  limit={vacancyLimit}
                  totalCount={vacancyTotalCount}
                  limitOptions={VACANCIES_LIMIT_OPTIONS}
                  onPageChange={(nextPage) =>
                    setVacancyOffset((nextPage - 1) * vacancyLimit)
                  }
                  onLimitChange={(nextLimit) => {
                    setVacancyLimit(nextLimit);
                    setVacancyOffset(0);
                  }}
                />
              )}

              {activeTab === "favorites" && favoritesData && (
                <AppPagination
                  page={favoritePage}
                  limit={favoriteLimit}
                  totalCount={favoriteTotalCount}
                  limitOptions={FAVORITES_LIMIT_OPTIONS}
                  onPageChange={(nextPage) =>
                    setFavoriteOffset((nextPage - 1) * favoriteLimit)
                  }
                  onLimitChange={(nextLimit) => {
                    setFavoriteLimit(nextLimit);
                    setFavoriteOffset(0);
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
            if (!open) {
              closeVacancyModal();
              setSelectedVacancyId(null);
            }
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
