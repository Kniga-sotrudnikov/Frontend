import { useState } from "react";
import { useEmployeesInfinite } from "@/entities/employee";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/lib";
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg?react";
import ArrowUpIcon from "@/shared/assets/icons/arrow-up.svg?react";

interface EmployeesMultiSelectProps {
  value: number[];
  onChange: (value: number[]) => void;
  placeholder?: string;
}

export const EmployeesMultiSelect = ({
  value,
  onChange,
  placeholder = "Выберите сотрудников",
}: EmployeesMultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const {
    data: employeesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEmployeesInfinite();

  const employees = employeesData?.pages.flatMap((page) => page.results) ?? [];

  const toggleEmployee = (id: number) => {
    onChange(
      value.includes(id) ? value.filter((item) => item !== id) : [...value, id],
    );
  };

  const label = value.length > 0 ? `Выбрано: ${value.length}` : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="plain"
          size="plain"
          className={cn(
            "h-8 w-full justify-between gap-2 border-input px-2.5 font-normal transition-colors",
            open && "border-ring ring-3 ring-ring/50",
          )}
        >
          <span
            className={cn(
              "text-xs truncate",
              value.length === 0 && "text-muted-foreground",
            )}
          >
            {label}
          </span>
          {open ? (
            <ArrowUpIcon className="size-4 shrink-0 text-muted-foreground" />
          ) : (
            <ArrowDownIcon className="size-4 shrink-0 text-muted-foreground" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-(--radix-popover-trigger-width)"
        align="start"
        sideOffset={4}
      >
        <div
          className="flex flex-col max-h-52 overflow-y-auto"
          onScroll={(e) => {
            const target = e.currentTarget;
            const isNearBottom =
              target.scrollTop + target.clientHeight >=
              target.scrollHeight - 20;

            if (isNearBottom && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        >
          {employees.map((employee) => {
            const checked = value.includes(employee.id);

            return (
              <label
                key={employee.id}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggleEmployee(employee.id)}
                  className="shrink-0"
                />
                <span className="text-xs text-gray-900">
                  {employee.full_name}
                </span>
              </label>
            );
          })}
          {isFetchingNextPage && (
            <span className="px-3 py-2 text-xs text-muted-foreground">
              Загрузка...
            </span>
          )}
          {employees.length === 0 && !isFetchingNextPage && (
            <span className="px-3 py-2 text-xs text-muted-foreground">
              Нет данных
            </span>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
