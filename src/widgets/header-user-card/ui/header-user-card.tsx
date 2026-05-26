import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import ExitIcon from "@/shared/assets/icons/exit.svg?react";
import UserIcon from "@/shared/assets/icons/user.svg?react"
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/model/routes/routes";
import { EmployeeProfileDialog } from "@/widgets/employee-profile-dialog";

interface HeaderUserCardProps {
  name: string;
  position: string;
  avatar?: string;
}

const mockEmployeeProfile = {
  primaryInfo: (
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
        А
      </div>
      <div>
        <div className="font-semibold text-black">
          Алексеева Виктория
        </div>
        <div className="text-xs text-gray-500">
          HR-специалист
        </div>
      </div>
    </div>
  ),

  roles: [
    "Подбор персонала",
    "Онбординг сотрудников",
    "HR-аналитика",
    "Ведение корпоративной культуры",
  ],

  emailInfo: (
    <a className="text-xs text-link hover:underline">
      victoria.alekseeva@company.com
    </a>
  ),

  phoneInfo: (
    <a className="text-xs text-link hover:underline">
      +420 777 123 456
    </a>
  ),

  leader: (
    <div className="text-xs">
      Иванов Сергей — Head of HR
    </div>
  ),

  city: "Прага",

  birthday: "1994-06-18",

  linkSocialNetwork: "https://linkedin.com/in/viktoria-alekseeva",

  linkCV: "https://example.com/cv/alekseeva.pdf",

  linkProfile: "https://crm.company.com/profile/12345",

  aboutMe:
    "HR-специалист с 6+ годами опыта в подборе и развитии команд. Люблю системный подход, автоматизацию процессов и работу с аналитикой.",

  tags: [
    "HR",
    "Recruitment",
    "Onboarding",
    "People Analytics",
    "Culture",
    "Communication",
    "Leadership",
  ],
  onExportPDF : () => {
    console.log("Export PDF");
  }
};

export function HeaderUserCard({ name, position, avatar }: HeaderUserCardProps) {
  // Получаем первую букву имени для аватара-заглушки
  const firstLetter = name.charAt(0);
  const navigate = useNavigate();

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
        <EmployeeProfileDialog {...mockEmployeeProfile}>
          <DropdownMenuItem>
          <UserIcon className="size-5 text-current"/>
          Мой профиль
        </DropdownMenuItem>
        </EmployeeProfileDialog>

        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <ExitIcon/>
          Выйти
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}