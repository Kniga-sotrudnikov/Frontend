import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import ExitIcon from "@/shared/assets/icons/exit.svg?react";
import UserIcon from "@/shared/assets/icons/user.svg?react";
import { EmployeeProfileDialog } from "@/widgets/employee-profile-dialog";
import { EmployeePrimaryInfo } from "@/entities/employee/ui/employee-primary-info";
import { EmployeeContacts } from "@/entities/employee/ui/employee-contacts";
import { LeaderPrimaryInfo } from "@/entities/employee/ui/leader-primary-info";
import { useEmployeeDetail } from "@/entities/employee";
import { useAuthStore } from "@/entities/user";
import { Skeleton } from "@/shared/ui/skeleton";
import { Button } from "@/shared/ui/button";

export function HeaderUserCard() {
  const employeeId = useAuthStore((s) => s.user?.employee_id ?? undefined);
  const { data: employee, isLoading } = useEmployeeDetail(employeeId);

  const handleLogout = () => {
    useAuthStore.getState().logout();
  };

  if (isLoading) {
    return <Skeleton className="h-15 w-[247px]" />;
  }

  if (!employee) {
    return (
      <Button
        onClick={handleLogout}
        variant="destructive"
        className="flex h-[60px] w-[247px] items-center gap-3 rounded-lg  px-2 py-2"
      >
        <ExitIcon />
        Выйти
      </Button>
    );
  }

  // Получаем первую букву имени для аватара-заглушки
  const firstLetter = employee.name.charAt(0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger hasArrow>
        <div className="flex h-[60px] max-w-[250px] items-center gap-3 rounded-lg px-1 py-2">
          {/* Аватар */}
          {employee.photo ? (
            <img
              src={employee.photo}
              alt={employee.name}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <div className="flex shrink-0 h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <span className="text-lg font-semibold">{firstLetter}</span>
            </div>
          )}

          {/* Имя и должность */}
          <div className="flex flex-col gap-1 items-start min-w-0">
            <span className="w-full truncate text-start body-m-semibold whitespace-nowrap text-black">
              {employee.name}
            </span>
            <span className="w-full truncate body-m text-start text-black">
              {employee.position}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8}>
        <EmployeeProfileDialog
          primaryInfo={
            /**
             * @todo Ошибка: не соответствие API status принимаемый с сервера не тоже самое что статус здесь! На беке статус обозначает архивированных сотрудников
             */
            <EmployeePrimaryInfo
              status="working"
              name={employee.name}
              position={employee.position}
              /**
               * @todo Что такое franchise? Это direction? Разобраться и вписать правильные данные
               */
              franchise={employee.franchise}
              department={employee.department}
            />
          }
          /**
           * roles должен быть массивом, а приходит строка.
           */
          roles={[]}
          emailInfo={
            <EmployeeContacts
              type="email"
              corpContact={employee.emailCorporate || ""}
              persContact={employee.emailPersonal || ""}
            />
          }
          phoneInfo={
            <EmployeeContacts
              type="phone"
              corpContact={employee.phoneCorporate || ""}
              persContact={employee.phonePersonal || ""}
            />
          }
          leader={
            <LeaderPrimaryInfo
              leaderName={employee.linearManager}
              leaderPosition=""
            />
          }
          city={employee.city}
          birthday={employee.birthday || ""}
          linkSocialNetwork=""
          linkCV=""
          linkProfile=""
          aboutMe=""
          tags={employee.competencies || []}
          //TODO: Доделать Экспорт PDF
          onExportPDF={() => console.log("Export PDF")}
        >
          <DropdownMenuItem
            disabled={!employee}
            onSelect={(event) => {
              event.preventDefault();
            }}
          >
            <UserIcon className="size-5 text-current" />
            Мой профиль
          </DropdownMenuItem>
        </EmployeeProfileDialog>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <ExitIcon />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
