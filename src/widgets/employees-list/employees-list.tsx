import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { cn } from "@/shared/lib";
import { useShallow } from "zustand/react/shallow";
import GridIcon from "@/shared/assets/icons/grid.svg?react";
import ListIcon from "@/shared/assets/icons/list.svg?react";
import EditIcon from "@/shared/assets/icons/edit.svg?react";
import { Button } from "@/shared/ui/button";
import type { EmployeeData } from "@/entities/employee";
import type { VacancyData } from "@/entities/vacancy";
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
import { EmployeePrimaryInfo } from "@/entities/employee/ui/employee-primary-info.tsx";
import { EmployeeContacts } from "@/entities/employee/ui/employee-contacts.tsx";
import { LeaderPrimaryInfo } from "@/entities/employee/ui/leader-primary-info.tsx";
import { useIsAdmin } from "@/entities/user";
import { useVacancyModalStore } from "@/features/vacancy-respond";
import { EmployeeCardsSkeleton } from "@/widgets/employee-card";

interface EmployeesListProps {
  employees: EmployeeData[];
  vacancies: VacancyData[];
  favoritesIds?: (number | string)[];
  onUpdateEmployee?: (updatedEmployee: EmployeeData) => void;
  isLoading?: boolean;
  skeletonCount?: number;
}

export const EmployeesList = ({
  employees,
  vacancies,
  favoritesIds = [],
  onUpdateEmployee,
  isLoading = false,
  skeletonCount = 6,
}: EmployeesListProps) => {
  const [activeTab, setActiveTab] = useState<
    "employees" | "vacancies" | "favorites" | "archive"
  >("employees");
  const [activeEntityTab, setActiveEntityTab] = useState<
    "employees" | "vacancies"
  >("employees");
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(
    null,
  );
  const [employeeToArchive, setEmployeeToArchive] =
    useState<EmployeeData | null>(null);

  const isAdmin = useIsAdmin();

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
      setActiveTab("employees");
    }
  }, [activeTab, isAdmin]);

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

  const openVacancyModal = useVacancyModalStore(
    (state) => state.openVacancyModal,
  );

  const favoriteEmployees = employees.filter(
    (emp) => favoritesIds.includes(emp.id) && !emp.isArchived,
  );

  const favoriteVacancies = vacancies.filter(
    (vac) => favoritesIds.includes(vac.id) && !vac.isArchived,
  );

  const allFavorites = [...favoriteEmployees, ...favoriteVacancies];

  const archivedEmployees = employees.filter((emp) => emp.isArchived === true);
  const archivedVacancies = vacancies.filter((vac) => vac.isArchived === true);
  const allArchived = [...archivedEmployees, ...archivedVacancies];

  const tabContentMap = {
    employees: employees.filter((emp) => !emp.isArchived),
    vacancies: vacancies.filter((vac) => !vac.isArchived),
    favorites: allFavorites,
    archive: allArchived,
  };

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

  const handleToggleFavorite = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Требуется реализовать добавление в Избранное",
    });
  };

  const handleEmployeeUpdate = (updatedEmployee: EmployeeData) => {
    setSelectedEmployee(updatedEmployee);
    onUpdateEmployee?.(updatedEmployee);
  };

  const handleRestoreVacancy = (vacancy: VacancyData) => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: `Восстановление вакансии «${vacancy.profession}» будет доступно позже`,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            const tab = value as
              | "employees"
              | "vacancies"
              | "favorites"
              | "archive";
            setActiveTab(tab);
          }}
        >
          <TabsList variant="line" className="gap-0 p-0 h-auto">
            <TabsTrigger
              value="employees"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Сотрудники
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {tabContentMap.employees.length}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="vacancies"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Вакансии
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {tabContentMap.vacancies.length}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center justify-center gap-1 px-3 py-2 button-small cursor-pointer"
            >
              Избранное
              <span className="inline-flex items-center justify-center size-5.5 bg-gray-100 text-black rounded-4 body-overline font-medium">
                {tabContentMap.favorites.length}
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
              setActiveEntityTab(value as "employees" | "vacancies");
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
                    ? favoriteEmployees.length
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

      {viewType === "list" && activeTab === "employees" ? (
        <DataTable
          columns={getEmployeeColumns(favoritesIds, handleToggleFavorite)}
          data={tabContentMap.employees}
          onRowClick={handleEmployeeClick}
          isLoading={isLoading}
          skeletonRows={skeletonCount}
        />
      ) : viewType === "list" && activeTab === "vacancies" ? (
        <DataTable
          columns={getVacancyColumns(
            favoritesIds,
            handleToggleFavorite,
            openVacancyModal,
          )}
          data={tabContentMap.vacancies}
          isLoading={isLoading}
          skeletonRows={skeletonCount}
        />
      ) : viewType === "list" &&
        hasNestedTabs &&
        activeEntityTab === "employees" ? (
        <DataTable
          columns={getEmployeeColumns(favoritesIds, handleToggleFavorite)}
          data={nestedTabContentMap[activeTab].employees}
          onRowClick={handleEmployeeClick}
          containerClassName="rounded-tl-none"
          isLoading={isLoading}
          skeletonRows={skeletonCount}
        />
      ) : viewType === "list" &&
        hasNestedTabs &&
        activeEntityTab === "vacancies" ? (
        <DataTable
          columns={getVacancyColumns(
            favoritesIds,
            handleToggleFavorite,
            activeTab === "archive" ? handleRestoreVacancy : openVacancyModal,
            activeTab === "archive" ? "restore" : "respond",
          )}
          data={nestedTabContentMap[activeTab].vacancies}
          isLoading={isLoading}
          skeletonRows={skeletonCount}
        />
      ) : isLoading ? (
        <EmployeeCardsSkeleton count={skeletonCount} />
      ) : (
        <RenderCards
          onEmployeeClick={handleEmployeeClick}
          items={itemsByTab}
          emptyText={emptyText}
          favoritesIds={favoritesIds}
          canEditEmployee={isAdmin}
          onToggleFavorite={handleToggleFavorite}
          onUpdateEmployee={onUpdateEmployee}
          onArchiveEmployee={setEmployeeToArchive}
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
          primaryInfo={
            <EmployeePrimaryInfo
              name={selectedEmployee.name}
              position={selectedEmployee.position}
              franchise={selectedEmployee.franchise}
              department={selectedEmployee.department}
              status={selectedEmployee.status}
              photo={selectedEmployee.photo}
              isArchived={selectedEmployee.isArchived}
            />
          }
          emailInfo={
            <EmployeeContacts
              type="email"
              corpContact={selectedEmployee.emailCorporate ?? ""}
              persContact={selectedEmployee.emailPersonal ?? ""}
            />
          }
          phoneInfo={
            <EmployeeContacts
              type="phone"
              corpContact={selectedEmployee.phoneCorporate ?? ""}
              persContact={selectedEmployee.phonePersonal ?? ""}
            />
          }
          leader={
            <LeaderPrimaryInfo
              leaderName={
                selectedEmployee.supervisor?.name ??
                selectedEmployee.linearManager
              }
              leaderPosition={selectedEmployee.supervisor?.position ?? ""}
              leaderPhoto={selectedEmployee.supervisor?.photo}
            />
          }
          roles={selectedEmployee.roles ?? []}
          tags={selectedEmployee.competencies ?? []}
          city={selectedEmployee.city}
          birthday={String(selectedEmployee.birthday)}
          linkSocialNetwork={selectedEmployee.socialNetwork ?? ""}
          linkCV={selectedEmployee.resumeLink ?? ""}
          linkProfile={selectedEmployee.crmProfile ?? ""}
          aboutMe={selectedEmployee.aboutMe ?? ""}
          onExportPDF={() => {}}
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
