import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import ExitIcon from "@/shared/assets/icons/exit.svg?react";
import UserIcon from "@/shared/assets/icons/user.svg?react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/model/routes/routes";
import { EmployeeProfileDialog } from "@/widgets/employee-profile-dialog";
import { EmployeePrimaryInfo } from "@/entities/employee/ui/employee-primary-info";
import { EmployeeContacts } from "@/entities/employee/ui/employee-contacts";
import { LeaderPrimaryInfo } from "@/entities/employee/ui/leader-primary-info";
import { useEmployeeDetailAdmin } from "@/entities/employee";
import { useAuthStore } from "@/entities/user";

interface HeaderUserCardProps {
  name: string;
  position: string;
  avatar?: string;
}

export function HeaderUserCard({
  name,
  position,
  avatar,
}: HeaderUserCardProps) {
  // Получаем первую букву имени для аватара-заглушки
  const firstLetter = name.charAt(0);
  const navigate = useNavigate();

  const employeeId = useAuthStore((s) => s.user?.employee_id ?? undefined);

  //TODO: Разобраться что показывать в карточке если у пользователя нет карточки
  const { data } = useEmployeeDetailAdmin(employeeId);

  const handleLogout = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger hasArrow>
        <div className="flex h-[60px] w-[247px] items-center gap-3 rounded-lg  px-2 py-2">
          {/* Аватар */}
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <div className="flex shrink-0 h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <span className="text-lg font-semibold">{firstLetter}</span>
            </div>
          )}

          {/* Имя и должность */}
          <div className="flex flex-col gap-1 items-start">
            <span className="body-m-semibold whitespace-nowrap text-black">
              {name}
            </span>
            <span className="body-m text-black">{position}</span>
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
              name={data?.full_name || "Ошибка: проверить данные"}
              position={data?.job_title || "Ошибка: проверить данные"}
              /**
               * @todo Что такое franchise? Это direction? Разобраться и вписать правильные данные
               */
              franchise={data?.direction_name || "Ошибка: проверить данные"}
              department={data?.department_name || "Ошибка: проверить данные"}
            />
          }
          /**
           * roles должен быть массивом, а приходит строка.
           */
          roles={
            data?.role_description
              ? [data.role_description]
              : ["Ошибка: проверить данные"]
          }
          emailInfo={
            <EmployeeContacts
              type="email"
              corpContact={data?.email || "example.example@example.example"}
              persContact="example.example@example.example"
            />
          }
          phoneInfo={
            <EmployeeContacts
              type="phone"
              corpContact={data?.phone || "+000000000000"}
              persContact="+000000000000"
            />
          }
          leader={
            <LeaderPrimaryInfo
              leaderName="Example Example"
              leaderPosition="Example"
            />
          }
          city="Example"
          birthday={data?.birthday || "1111-11-11"}
          linkSocialNetwork="https://example.com/example-example"
          linkCV="https://example.com/cv/example-example"
          linkProfile="https://example.com/crm/example-example"
          aboutMe={data?.interests || "Ошибка: проверить данные"}
          tags={
            data?.tags
              ? data.tags.map((tag) => tag.name)
              : ["Ошибка: проверить данные"]
          }
          //TODO: Доделать Экспорт PDF
          onExportPDF={() => console.log("Export PDF")}
        >
          <DropdownMenuItem
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
