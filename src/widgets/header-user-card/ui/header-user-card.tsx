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
        className="flex h-[60px] w-[247px] items-center gap-3 rounded-lg px-2 py-2"
      >
        <ExitIcon />
        Выйти
      </Button>
    );
  }

  const firstLetter = employee.name.charAt(0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger hasArrow>
        <div className="flex h-[60px] max-w-[250px] items-center gap-3 rounded-lg px-1 py-2">
          {employee.photo ? (
            <img
              src={employee.photo}
              alt={employee.name}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <span className="text-lg font-semibold">{firstLetter}</span>
            </div>
          )}

          <div className="flex min-w-0 flex-col items-start gap-1">
            <span className="body-m-semibold w-full truncate whitespace-nowrap text-start text-black">
              {employee.name}
            </span>
            <span className="body-m w-full truncate text-start text-black">
              {employee.position}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8}>
        <EmployeeProfileDialog employeeId={employeeId || null}>
          <div className="w-full"> {/* <-- Оборачиваем в div */}
            <DropdownMenuItem
              disabled={!employee}
              onSelect={(event) => {
                event.preventDefault();
              }}
              className="w-full"
            >
              <UserIcon className="size-5 text-current" />
              Мой профиль
            </DropdownMenuItem>
          </div>
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