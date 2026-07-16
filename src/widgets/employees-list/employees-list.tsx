import { useState, useEffect, useMemo, type ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { cn } from "@/shared/lib";
import { useShallow } from "zustand/react/shallow";
import GridIcon from "@/shared/assets/icons/grid.svg?react";
import ListIcon from "@/shared/assets/icons/list.svg?react";
import EditIcon from "@/shared/assets/icons/edit.svg?react";
import { Button } from "@/shared/ui/button";
import type { EmployeeData } from "@/entities/employee";
import { RenderCards } from "./render-cards";
import { DataTable } from "@/shared/ui/table/data-table";
import { getEmployeeColumns, getVacancyColumns } from "./employee-columns";
import { useNotificationStore } from "@/shared/model/stores";
import {
  ArchiveEmployeeDialog,
  EditEmployeeButton,
  useEmployeesPageStore,
  useEmployeeModalStore,
} from "@/features/employee";
import { EmployeeProfileDialog } from "@/widgets/employee-profile-dialog";
import { useIsAdmin, useAuthStore } from "@/entities/user";
import { useGetFavorites, useToggleFavorite } from "@/entities/favorites";
import { EmployeeCardsSkeleton } from "@/widgets/employee-card";
import type { NormalizedVacancy } from "@/entities/vacancy";
import type {
  EmployeesListEntityTab,
  EmployeesListTab,
  EmployeesListType,
} from "./types";

interface EmployeesListProps {
  employees: EmployeeData[];
  vacancies: NormalizedVacancy[];
  favoriteItems: EmployeesListType[];
  activeTab: EmployeesListTab;
  onActiveTabChange: (tab: EmployeesListTab) => void;
  activeEntityTab: EmployeesListEntityTab;
  onActiveEntityTabChange: (tab: EmployeesListEntityTab) => void;
  employeesCount?: number;
  vacanciesCount?: number;
  favoritesCount?: number;
  onUpdateEmployee?: (updatedEmployee: EmployeeData) => void;
  onVacancyClick?: (vacancy: NormalizedVacancy) => void;
  isLoading?: boolean;
  isVacanciesLoading?: boolean;
  isFavoritesLoading?: boolean;
  skeletonCount?: number;
  vacancySkeletonCount?: number;
  favoriteSkeletonCount?: number;
  employeesEmptyState?: ReactNode;
}

export const EmployeesList = ({
  employees,
  vacancies,
  favoriteItems,
  activeTab,
  onActiveTabChange,
  activeEntityTab,
  onActiveEntityTabChange,
  employeesCount,
  vacanciesCount,
  favoritesCount,
  onUpdateEmployee,
  onVacancyClick,
  isLoading = false,
  isVacanciesLoading = false,
  isFavoritesLoading = false,
  skeletonCount = 6,
  vacancySkeletonCount = skeletonCount,
  favoriteSkeletonCount = skeletonCount,
  employeesEmptyState,
}: EmployeesListProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(
    null,
  );
  const [employeeToArchive, setEmployeeToArchive] =
    useState<EmployeeData | null>(null);

  const isAdmin = useIsAdmin();

  const currentUser = useAuthStore((state) => state.user);
  const currentEmployeeId = currentUser?.employee_id;

  const { data: favoritesData } = useGetFavorites();
  const { toggleFavorite, isPending } = useToggleFavorite();

  const favoriteIds = useMemo(() => {
    return favoritesData?.results.map((favorite) => favorite.id) ?? [];
  }, [favoritesData]);

  const filteredEmployees = useMemo(() => {
    if (!currentEmployeeId) return employees;
    return employees.filter((emp) => Number(emp.id) !== currentEmployeeId);
  }, [employees, currentEmployeeId]);

  const { selectedEmployeeFromStore, openEmployeeModal, closeEmployeeModal } =
    useEmployeeModalStore(
      useShallow((state) => ({
        selectedEmployeeFromStore: state.selectedEmployee,
        openEmployeeModal: state.openEmployeeModal,
        closeEmployeeModal: state.closeEmployeeModal,
      })),
    );

  useEffect(() => {
    if (selectedEmployeeFromStore) {
      setSelectedEmployee(selectedEmployeeFromStore);
    }
  }, [selectedEmployeeFromStore]);

  useEffect(() => {
    if (!isAdmin && activeTab === "archive") {
      onActiveTabChange("employees");
    }
  }, [activeTab, isAdmin, onActiveTabChange]);

  const handleEmployeeClick = (employee: EmployeeData) => {
    setSelectedEmployee(employee);
    openEmployeeModal(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
    closeEmployeeModal();
  };

  const { viewType, setViewType } = useEmployeesPageStore(
    useShallow((state) => ({
      viewType: state.viewType,
      setViewType: state.setViewType,
    })),
  );
  const addNotification = useNotificationStore((state) => state.add);

  const handleVacancyClick = (vacancy: NormalizedVacancy) => {
    onVacancyClick?.(vacancy);
  };

  const favoriteEmployees = favoriteItems.filter(
    (item): item is EmployeeData => "name" in item && "linearManager" in item,
  );

  const favoriteVacancies = favoriteItems.filter(
    (item): item is NormalizedVacancy =>
      "profession" in item && "position" in item,
  );
  const favoriteEmployeesCount = favoritesCount ?? favoriteEmployees.length;

  const archivedEmployees = filteredEmployees.filter(
    (emp) => emp.isArchived === true,
  );
  const archivedVacancies = vacancies.filter((vac) => vac.isArchived === true);
  const allArchived = [...archivedEmployees, ...archivedVacancies];

  const tabContentMap = {
    employees: filteredEmployees.filter((emp) => !emp.isArchived),
    vacancies: vacancies.filter((vac) => !vac.isArchived),
    favorites: favoriteItems,
    archive: allArchived,
  };

  const showEmployeesEmptyState =
    !!employeesEmptyState &&
    activeTab === "employees" &&
    !isLoading &&
    tabContentMap.employees.length === 0;

  const nestedTabContentMap = {
    favorites: {
      employees: favoriteEmployees,
      vacancies: favoriteVacancies,
    },
    archive: {
      employees: archivedEmployees,
      vacancies: archivedVacancies,
    },
  };

  const emptyTextMap = {
    employees: "Нет активных сотрудников",
    vacancies: "Нет активных вакансий",

    favorites: {
      all: "Нет избранных сотрудников или вакансий",
      employees: "Нет избранных сотрудников",
      vacancies: "Нет избранных вакансий",
    },

    archive: {
      all: "В архиве ничего нет",
      employees: "Нет архивных сотрудников",
      vacancies: "Нет архивных вакансий",
    },
  };

  const hasNestedTabs = activeTab === "favorites" || activeTab === "archive";

  const itemsByTab = tabContentMap[activeTab];

  const emptyText = hasNestedTabs
    ? emptyTextMap[activeTab].all
    : emptyTextMap[activeTab];

  const handleToggleEmployeeFavorite = (id: string | number) => {
    if (isPending) return;
    toggleFavorite(Number(id));
  };

  // TODO: Когда появится API для вакансий - заменить на реальный
  const handleToggleVacancyFavorite = (id: string | number) => {
    addNotification({
      iconType: "warning",
      title: "В разработке",
      message: `Избранное для вакансии #${id} появится позже`,
    });
  };

  const handleEmployeeUpdate = (updatedEmployee: EmployeeData) => {
    setSelectedEmployee(updatedEmployee);
    onUpdateEmployee?.(updatedEmployee);
  };

  const handleRestoreVacancy = (vacancy: NormalizedVacancy) => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: `Восстановление вакансии «${vacancy.profession}» будет доступно позже`,
    });
  };

  const cardsLoading =
    activeTab === "vacancies"
      ? isVacanciesLoading
      : activeTab === "favorites"
        ? isFavoritesLoading
        : activeTab === "archive"
          ? isLoading || isVacanciesLoading
          : isLoading;

  const cardsSkeletonCount =
    activeTab === "vacancies"
      ? vacancySkeletonCount
      : activeTab === "favorites"
        ? favoriteSkeletonCount
        : skeletonCount;

  const nestedEmployeesLoading =
    activeTab === "favorites" ? isFavoritesLoading : isLoading;
  const nestedVacanciesLoading =
    activeTab === "favorites" ? isFavoritesLoading : isVacanciesLoading;
  const nestedSkeletonCount =
    activeTab === "favorites" ? favoriteSkeletonCount : skeletonCount;

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Tabs
          className="min-w-0 flex-1 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          value={activeTab}
          onValueChange={(value) => {
            const tab = value as
              | "employees"
              | "vacancies"
              | "favorites"
              | "archive";
            onActiveTabChange(tab);
          }}
        >
          <TabsList variant="line" className="gap-0 p-0 h-auto">
            <TabsTrigger
              value="employees"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Сотрудники
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {employeesCount ?? tabContentMap.employees.length}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="vacancies"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Вакансии
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {vacanciesCount ?? tabContentMap.vacancies.length}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Избранное
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {favoritesCount ?? tabContentMap.favorites.length}
              </span>
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger
                value="archive"
                className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
              >
                Архив
                <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                  {tabContentMap.archive.length}
                </span>
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>

        <div className="flex rounded-8 h-8 overflow-hidden">
          <Button
            variant="plain"
            size="plain"
            onClick={() => setViewType("grid")}
            className={cn(
              "py-1.5 px-2 rounded-none rounded-l-8 h-full transition-none",
              viewType === "grid"
                ? "bg-purple-50 border border-purple-100"
                : "bg-white border-y border-l border-gray-200",
              viewType !== "grid" && "border-r-0",
            )}
          >
            <GridIcon className="size-5" />
          </Button>
          <Button
            variant="plain"
            size="plain"
            onClick={() => setViewType("list")}
            className={cn(
              "py-1.5 px-2 rounded-none rounded-r-8 h-full transition-none",
              viewType === "list"
                ? "bg-purple-50 border border-purple-100"
                : "bg-white border-y border-r border-gray-200",
              viewType !== "list" && "border-l-0",
            )}
          >
            <ListIcon className="size-5" />
          </Button>
        </div>
      </div>

      {viewType === "list" &&
        (activeTab === "favorites" || activeTab === "archive") && (
          <Tabs
            value={activeEntityTab}
            onValueChange={(value) => {
              onActiveEntityTabChange(value as EmployeesListEntityTab);
            }}
          >
            <TabsList className="gap-1 p-0 bg-transparent">
              <TabsTrigger
                value="employees"
                className="px-3 py-2 button-small cursor-pointer border-0 rounded-b-none group-data-[variant=default]/tabs-list:data-active:shadow-none"
              >
                Сотрудники
                <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                  {activeTab === "favorites"
                    ? favoriteEmployeesCount
                    : archivedEmployees.length}
                </span>
              </TabsTrigger>

              <TabsTrigger
                value="vacancies"
                className="px-3 py-2 button-small cursor-pointer border-0 rounded-b-none group-data-[variant=default]/tabs-list:data-active:shadow-none"
              >
                Вакансии
                <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                  {activeTab === "favorites"
                    ? favoriteVacancies.length
                    : archivedVacancies.length}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

      { showEmployeesEmptyState ? ( employeesEmptyState )
      : viewType === "list" && activeTab === "employees" ? (
        <DataTable
          columns={getEmployeeColumns(
            favoriteIds,
            handleToggleEmployeeFavorite,
            isPending,
          )}
          data={tabContentMap.employees}
          onRowClick={handleEmployeeClick}
          isLoading={isLoading}
          skeletonRows={skeletonCount}
        />
      ) : viewType === "list" && activeTab === "vacancies" ? (
        <DataTable
          columns={getVacancyColumns(
            favoriteIds,
            handleToggleVacancyFavorite,
            handleVacancyClick,
          )}
          data={tabContentMap.vacancies}
          isLoading={isVacanciesLoading}
          skeletonRows={vacancySkeletonCount}
        />
      ) : viewType === "list" &&
        hasNestedTabs &&
        activeEntityTab === "employees" ? (
        <DataTable
          columns={getEmployeeColumns(
            favoriteIds,
            handleToggleEmployeeFavorite,
            isPending,
          )}
          data={nestedTabContentMap[activeTab].employees}
          onRowClick={handleEmployeeClick}
          containerClassName="rounded-tl-none"
          isLoading={nestedEmployeesLoading}
          skeletonRows={nestedSkeletonCount}
        />
      ) : viewType === "list" &&
        hasNestedTabs &&
        activeEntityTab === "vacancies" ? (
        <DataTable
          columns={getVacancyColumns(
            favoriteIds,
            handleToggleVacancyFavorite,
            activeTab === "archive" ? handleRestoreVacancy : handleVacancyClick,
            activeTab === "archive" ? "restore" : "respond",
          )}
          data={nestedTabContentMap[activeTab].vacancies}
          isLoading={nestedVacanciesLoading}
          skeletonRows={
            activeTab === "favorites"
              ? favoriteSkeletonCount
              : vacancySkeletonCount
          }
        />
      ) : cardsLoading ? (
        <EmployeeCardsSkeleton count={cardsSkeletonCount} />
      ) : (
        <RenderCards
          onEmployeeClick={handleEmployeeClick}
          onVacancyClick={handleVacancyClick}
          items={itemsByTab}
          emptyText={emptyText}
          favoritesIds={favoriteIds}
          canEditEmployee={isAdmin}
          onToggleEmployeeFavorite={handleToggleEmployeeFavorite}
          onToggleVacancyFavorite={handleToggleVacancyFavorite}
          onUpdateEmployee={onUpdateEmployee}
          onArchiveEmployee={setEmployeeToArchive}
          isPending={isPending}
        />
      )}

      {selectedEmployee && (
        <EmployeeProfileDialog
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              handleCloseModal();
            }
          }}
          employeeId={Number(selectedEmployee.id)}
          editButton={
            isAdmin ? (
              <EditEmployeeButton
                employee={selectedEmployee}
                onSuccess={handleEmployeeUpdate}
              >
                <Button className="w-42">
                  <EditIcon />
                  Редактировать
                </Button>
              </EditEmployeeButton>
            ) : undefined
          }
        />
      )}

      {employeeToArchive && (
        <ArchiveEmployeeDialog
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              setEmployeeToArchive(null);
            }
          }}
          onConfirm={() => {
            setEmployeeToArchive(null);
          }}
        />
      )}
    </div>
  );
};
