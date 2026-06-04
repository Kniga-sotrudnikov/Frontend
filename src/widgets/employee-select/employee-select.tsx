import { useState, useRef, useEffect, useCallback } from "react";
import { Checkbox } from "@ui/checkbox";
import { Button } from "@ui/button";
import { cn } from "@/shared/lib";
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg?react";
import ArrowUpIcon from "@/shared/assets/icons/arrow-up.svg?react";
import {
  EmployeeCardSmall,
  type Employee,
} from "@/widgets/employee-card-small";
import { EmptyPlaceholder } from "@/shared/ui/empty-placeholder";

type EmployeeSelectProps = {
  title: string;
  employees: Employee[];
  selectedEmployees: Employee[];
  onSelectedChange: (employees: Employee[]) => void;
  searchPlaceholder?: string;
  className?: string;
};

export const EmployeeSelect = ({
  title,
  employees,
  selectedEmployees,
  onSelectedChange,
  searchPlaceholder = "Алексеева Анна Викторовна",
  className,
}: EmployeeSelectProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSelected, setTempSelected] =
    useState<Employee[]>(selectedEmployees);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp.position &&
        emp.position.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const isSelected = (employeeId: string) => {
    return tempSelected.some((emp) => emp.id === employeeId);
  };

  const toggleEmployee = (employee: Employee) => {
    if (isSelected(employee.id)) {
      setTempSelected(tempSelected.filter((emp) => emp.id !== employee.id));
    } else {
      setTempSelected([...tempSelected, employee]);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setTempSelected([...selectedEmployees]);
    setSearchQuery("");
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    setTempSelected([...selectedEmployees]);
    setSearchQuery("");
  }, [selectedEmployees]);

  const handleClear = () => {
    setTempSelected([]);
  };

  const handleAdd = () => {
    onSelectedChange(tempSelected);
    setOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, selectedEmployees, handleClose]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "w-full bg-white",
        open && "p-5 border border-gray-200 rounded-8",
        className,
      )}
    >
      <h3 className="body-s text-black mb-2">{title}</h3>

      <div className="relative">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!open) handleOpen();
          }}
          onClick={handleOpen}
          className="w-full px-4 py-2.5 body-m text-gray-600 border border-gray-200 rounded-8 bg-white focus:outline-none focus:border-purple-500"
        />
        <Button
          type="button"
          variant="plain"
          size="plain"
          onClick={open ? handleClose : handleOpen}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-0 w-5 h-5 [&_svg]:w-5 [&_svg]:h-5"
        >
          {open ? (
            <ArrowUpIcon className="w-5 h-5" />
          ) : (
            <ArrowDownIcon className="w-5 h-5" />
          )}
        </Button>
      </div>

      {open && (
        <div className="mt-3">
          <div className="overflow-y-auto max-h-64">
            {filteredEmployees.length === 0 ? (
              <EmptyPlaceholder text="Сотрудники не найдены" />
            ) : (
              <div className="flex flex-col gap-1">
                {filteredEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    onClick={() => toggleEmployee(employee)}
                    className="flex items-center gap-2 px-2 py-1.75 rounded-8 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      checked={isSelected(employee.id)}
                      className="shrink-0 w-5 h-5 [&_button]:w-5 [&_button]:h-5 pointer-events-none"
                    />
                    <EmployeeCardSmall employee={employee} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-3 h-8">
            <Button
              variant="outline"
              size="plain"
              onClick={handleClear}
              className="button-small px-3.75 h-8"
            >
              Очистить
            </Button>
            <Button
              variant="default"
              size="plain"
              onClick={handleAdd}
              className="button-small px-5.75 h-8"
            >
              Добавить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
