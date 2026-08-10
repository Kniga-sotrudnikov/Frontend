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
import {
  useEmployeeModalStore,
  useEmployeesPageStore,
  citiesFilterOptions,
} from "@/features/employee";
import { AppPagination } from "@ui/pagination";
import {
  useSelectionUnitStore,
  useSummaryStats,
} from "@/entities/org-structure";
import { selectedUnitToFilter } from "./lib/selected-unit-to-filter";
import { format } from "date-fns";
import { useGetVacancies, useGetVacancyDetail } from "@/entities/vacancy";
import { pluralize, useLastDefinedValue, useDebounce } from "@/shared/lib";
import { useGetFavorites } from "@/entities/favorites";
import { EmployeeNotFound } from "@/widgets/employee-not-found";

const PAGINATION_LIMIT_OPTIONS = [6, 12, 24, 50];
const DEFAULT_PAGINATION_LIMIT = 12;

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
  const { viewType, searchQuery, setSearchQuery, statusFilter, citiesFilter } =
    useEmployeesPageStore(
      useShallow((state) => ({
        viewType: state.viewType,
        searchQuery: state.searchQuery,
        setSearchQuery: state.setSearchQuery,
        statusFilter: state.statusFilter,
        citiesFilter: state.citiesFilter,
      }))
    );
  
  const [activeTab, setActiveTab] = useState<EmployeesListTab>("employees");
  const [activeEntityTab, setActiveEntityTab] =
    useState<EmployeesListEntityTab>("employees");

  const [paginationLimit, setPaginationLimit] = useState(
    DEFAULT_PAGINATION_LIMIT,
  );
  const [paginationOffset, setPaginationOffset] = useState(0);
  const [selectedVacancyId, setSelectedVacancyId] = useState<number | null>(
    null,
  );

  const selectedUnit = useSelectionUnitStore((state) => state.selectedUnit);
  const setSelectedUnit = useSelectionUnitStore(
    (state) => state.setSelectedUnit,
  );

  /* Разделы «УК» и «СИС» пока не поддерживаются бэкендом: данных по ним нет,
  поэтому вместо списка сотрудников показываем заглушку */
  const isUnsupportedUnit =
    !!selectedUnit?.head && selectedUnit.name !== "Направления";

  const debouncedSearch = useDebounce(searchQuery);
  const filter = useMemo(() => {
    const unitFilter = selectedUnitToFilter(selectedUnit);
    const search = debouncedSearch.trim();
    // в citiesFilter хранятся slug-значения опций, бэкенд ждёт название города
    const city = citiesFilterOptions.find(
      (option) => option.value === citiesFilter[0],
    )?.label;
    return {
      ...unitFilter,
      ...(search ? { search } : {}),
      ...(statusFilter.length ? { employment_status: statusFilter } : {}),
      ...(city ? { city } : {}),
    };
  }, [selectedUnit, debouncedSearch, statusFilter, citiesFilter]);

  // при смене выбранного узла возвращаемся на первую страницу
  useEffect(() => {
    setPaginationOffset(0);
  }, [filter]);
  // сброс выбранного узла при уходе со страницы
  useEffect(() => {
    return () => {
      setSelectedUnit(null);
      setSearchQuery("");
    }
  }, [setSelectedUnit, setSearchQuery]);

  const { data: listData, isLoading: isListLoading } = useEmployeesList(
    paginationLimit,
    paginationOffset,
    undefined,
    filter,
  );

  const { data: summaryData, isLoading: isSummaryLoading } = useSummaryStats();
  const { data: vacanciesData, isLoading: isVacanciesLoading } =
    useGetVacancies({
      limit: paginationLimit,
      offset: paginationOffset,
    });
  const { data: favoritesData, isLoading: isFavoritesLoading } =
    useGetFavorites({
      limit: paginationLimit,
      offset: paginationOffset,
    });
  const { data: vacancyDetail } = useGetVacancyDetail(selectedVacancyId ?? 0);

  const lastEmployeeCount = useLastDefinedValue(listData?.count, 0);
  const employeeTotalCount = isUnsupportedUnit ? 0 : lastEmployeeCount;
  const vacancyTotalCount = useLastDefinedValue(vacanciesData?.count, 0);
  const favoriteTotalCount = useLastDefinedValue(favoritesData?.count, 0);
  const paginationPage = Math.floor(paginationOffset / paginationLimit) + 1;
  const getActivePagination = () => {
    switch (activeTab) {
      case "employees":
        return { totalCount: employeeTotalCount, hasData: !!listData && employeeTotalCount > 0};
      case "vacancies":
        return { totalCount: vacancyTotalCount, hasData: !!vacanciesData };
      case "favorites":
        if (viewType === "list" && activeEntityTab === "vacancies") {
          return { totalCount: 0, hasData: false };
        }

        return { totalCount: favoriteTotalCount, hasData: !!favoritesData };
      case "archive":
        return { totalCount: 0, hasData: false };
    }
  };
  const activePagination = getActivePagination();

  const employees = useMemo(() => {
    if (isUnsupportedUnit) return [];
    return listData?.results ?? [];
  }, [listData?.results, isUnsupportedUnit]);
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
  const handlePatchEmployee = async (employee: EmployeeData) => {
    patchEmployee({
      id: employee.id,
      data: {
      full_name: employee.name,
      job_title: employee.position,
      role_description: employee.role!.split(",").map(item => item.trim()).filter(Boolean),
      email: employee.emailCorporate,
      personal_email: employee.emailPersonal,
      phone: employee.phoneCorporate,
      personal_phone: employee.phonePersonal,
      interests: employee.aboutMe,
      birthday: format(employee.birthday!, "yyyy-MM-dd"),
      department: Number(employee.department),
      city: employee.city,
      employment_status : employee.status,
      crm_profile: employee.crmProfile,
      resume_link: employee.resumeLink,
      social_network: employee.socialNetwork,
      tags: employee.competencies,
      },
    });
  };

  const handleActiveTabChange = (tab: EmployeesListTab) => {
    if (tab === activeTab) return;

    setActiveTab(tab);
    setPaginationLimit(DEFAULT_PAGINATION_LIMIT);
    setPaginationOffset(0);
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
            <SearchInput
              wrapperClassName="focus-within:ring-0"
              placeholder="Поиск по ФИО, должности, тегам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery("")}
            />
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
                  onActiveTabChange={handleActiveTabChange}
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
                  isLoading={isUnsupportedUnit ? false : isListLoading}
                  isVacanciesLoading={isVacanciesLoading}
                  isFavoritesLoading={isFavoritesLoading}
                  skeletonCount={paginationLimit}
                  vacancySkeletonCount={paginationLimit}
                  favoriteSkeletonCount={paginationLimit}
                  employeesEmptyState={
                    isUnsupportedUnit ? (
                      <EmployeeNotFound
                        title="Раздел пока недоступен"
                        description={
                          <>
                            Раздел «{selectedUnit?.name}» ещё не поддерживается:
                            данные по нему не приходят с сервера.
                          </>
                        }
                        showClearSearch={false}
                        onShowAll={() => {
                          setSearchQuery("");
                          setSelectedUnit(null);
                        }}
                      />
                    ) : debouncedSearch.trim() ? (
                      <EmployeeNotFound
                        searchQuery={debouncedSearch.trim()}
                        onClearSearch={() => setSearchQuery("")}
                        onShowAll={() => {
                          setSearchQuery("");
                          setSelectedUnit(null);
                        }}
                      />
                    ) : undefined
                  }
                />
                <div className="min-h-11">
                  {activePagination.hasData && (
                    <AppPagination
                      page={paginationPage}
                      limit={paginationLimit}
                      totalCount={activePagination.totalCount}
                      limitOptions={PAGINATION_LIMIT_OPTIONS}
                      onPageChange={(nextPage) =>
                        setPaginationOffset((nextPage - 1) * paginationLimit)
                      }
                      onLimitChange={(nextLimit) => {
                        setPaginationLimit(nextLimit);
                        setPaginationOffset(0);
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
