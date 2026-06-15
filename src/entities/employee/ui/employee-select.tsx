import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib";
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg?react";
import ArrowUpIcon from "@/shared/assets/icons/arrow-up.svg?react";
import type { TShortEmployee } from "@/entities/employee";

interface EmployeeSelectProps {
  value: number | null;
  employees: TShortEmployee[];
  onSelect: (id: number, name: string) => void;
  placeholder?: string;
}

export const EmployeeSelect = ({
  value,
  employees,
  onSelect,
  placeholder = "Выберите руководителя",
}: EmployeeSelectProps) => {
  const [open, setOpen] = useState(false);
  const selected = employees.find((e) => e.id === value);

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
              !selected && "text-muted-foreground",
            )}
          >
            {selected ? selected.name : placeholder}
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
        <div className="flex flex-col max-h-52 overflow-y-auto">
          {employees.map((e) => (
            <Button
              key={e.id}
              type="button"
              variant="ghost"
              size="plain"
              onClick={() => {
                onSelect(e.id, e.name);
                setOpen(false);
              }}
              className={cn(
                "w-full flex-col items-start gap-0.5 rounded-none px-3 py-2 font-normal text-left hover:bg-gray-100 transition-colors",
                e.id === value && "bg-gray-50",
              )}
            >
              <span className="text-xs font-medium text-gray-900">
                {e.name}
              </span>
              <span className="text-xs text-gray-500">{e.job}</span>
            </Button>
          ))}
          {employees.length === 0 && (
            <span className="px-3 py-2 text-xs text-muted-foreground">
              Нет данных
            </span>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
