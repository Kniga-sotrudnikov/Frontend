import { useState, useMemo } from "react";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@ui/dialog";
import { Checkbox } from "@ui/checkbox";
import { FormInput } from "@/features/create-employee/ui/form-input";
import { FormSelect } from "@/features/create-employee/ui/form-select";
import type { TExpertiseFilterGroup } from "../model/types";
import { usePreventDialogClose } from "@/shared/lib/hooks/use-prevent-dialog-close";

type Employee = {
  id: string;
  name: string;
  position: string;
  photo?: string;
  status?: "working" | "vacation" | "sick" | "bizTrip";
};

type AddTagDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: TExpertiseFilterGroup[];
  selectedGroup: string;
  onGroupChange: (groupKey: string) => void;
  tagName: string;
  onTagNameChange: (name: string) => void;
  employees?: Employee[];
  selectedEmployees?: string[];
  onEmployeeToggle?: (employeeId: string) => void;
  onClearEmployees?: () => void;
  onAdd: () => void;
  onSave: () => void;
  isPending?: boolean;
};

export const AddTagDialog = ({
  open,
  onOpenChange,
  groups,
  selectedGroup,
  onGroupChange,
  tagName,
  onTagNameChange,
  employees = [],
  selectedEmployees = [],
  onEmployeeToggle,
  onClearEmployees,
  onAdd,
  onSave,
  isPending = false,
}: AddTagDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const preventDialogClose = usePreventDialogClose();

  const groupOptions = groups.map((group) => ({
    value: group.key,
    label: group.title,
  }));

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return employees;
    const query = searchQuery.toLowerCase();
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(query) ||
        emp.position.toLowerCase().includes(query),
    );
  }, [employees, searchQuery]);

  const handleClearAll = () => {
    onTagNameChange("");
    onClearEmployees?.();
  };

  const isAddDisabled = !selectedGroup || !tagName.trim();
  const isSaveDisabled = !selectedGroup || !tagName.trim();

  const handleAdd = () => {
    onAdd();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!w-[753px] !max-w-none !h-auto !p-5 !rounded-12 !border !border-gray-200 !bg-white overflow-hidden"
        onInteractOutside={preventDialogClose}
      >
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex justify-between items-center">
            <DialogHeader className="!p-0">
              <DialogTitle className="text-[16px] font-semibold text-[#1A1A1A] leading-[19px]">
                Добавить тег
              </DialogTitle>
            </DialogHeader>
            <DialogClose variant="icon" />
          </div>

          <div className="flex gap-4">
            <div className="min-w-0 flex-1">
              <label className="block text-[14px] font-normal leading-5 tracking-[0.1px] text-[#141615]">
                Категория
              </label>
              <FormSelect
                value={selectedGroup}
                onValueChange={onGroupChange}
                options={groupOptions}
                placeholder="Выберите категорию"
              />
            </div>

            <div className="min-w-0 flex-1">
              <label className="block text-[14px] font-normal leading-5 tracking-[0.1px] text-[#141615]">
                Название
              </label>
              <FormInput
                placeholder="Например, Опыт в коучинге"
                value={tagName}
                onChange={(e) => onTagNameChange(e.target.value)}
              />
            </div>
          </div>

          {employees.length > 0 && (
            <div className="border border-[#D6D6D6] rounded-[8px] p-4 shadow-[3px_3px_10px_rgba(0,0,0,0.05)]">
              <div className="mb-0">
                <label className="block text-[14px] font-normal leading-5 tracking-[0.1px] text-[#141615] mb-1">
                  Добавьте сотрудников
                </label>
                <div className="relative">
                  <FormInput
                    placeholder="Поиск"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    wrapperClassName="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1 max-h-[164px] overflow-y-auto mt-2">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <div
                      key={employee.id}
                      className="flex items-center gap-3 p-1 border border-[#D6D6D6] rounded-[8px]"
                    >
                      <Checkbox
                        checked={selectedEmployees.includes(employee.id)}
                        onCheckedChange={() => onEmployeeToggle?.(employee.id)}
                        className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                      />
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div className="w-6 h-6 shrink-0 rounded-full bg-gray-200 overflow-hidden">
                          {employee.photo ? (
                            <img
                              src={employee.photo}
                              alt={employee.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                              Нет фото
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-[14px] font-semibold leading-5 tracking-[0.1px] text-[#2C2A29]">
                            {employee.name}
                          </div>
                          <div className="truncate text-[12px] font-normal leading-[14px] text-gray-500">
                            {employee.position}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    Сотрудники не найдены
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClearAll}
                  className="w-[102px] h-6 text-[14px] font-medium border-purple-500 text-[#141615] hover:bg-purple-50"
                >
                  Очистить
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={isAddDisabled || isPending}
                  className="w-[118px] h-6 text-[14px] font-medium bg-purple-500 hover:bg-purple-600 text-white rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? "Добавление..." : "Добавить"}
                </Button>
              </div>
            </div>
          )}

          {employees.length === 0 && (
            <div className="text-center text-gray-500 py-4 border border-dashed border-gray-300 rounded-lg">
              Нет данных о сотрудниках
            </div>
          )}

          <p className="text-[12px] font-normal leading-[15px] tracking-[0.1px] text-[#7A7A7A]">
            Тег будет доступен HR и сотрудникам для фильтрации
          </p>

          <div className="flex justify-end gap-3 mt-3">
            <Button
              type="button"
              variant="plain"
              onClick={() => onOpenChange(false)}
              className="w-[105px] h-6 border border-purple-500 bg-white text-[14px] font-medium text-purple-500 hover:bg-purple-50 rounded-[8px]"
            >
              Отменить
            </Button>
            <Button
              onClick={onSave}
              disabled={isSaveDisabled}
              className="w-[111px] h-6 text-[14px] font-medium bg-purple-500 hover:bg-purple-600 text-white rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};