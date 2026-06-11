import { useState, useMemo } from "react";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@ui/dialog";
import { Input } from "@ui/input";
import { Checkbox } from "@ui/checkbox";
import SearchIcon from "@icons/search.svg?react";
import type { TExpertiseFilterGroup } from "../model/types";

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
}: AddTagDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return employees;
    const query = searchQuery.toLowerCase();
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(query) ||
        emp.position.toLowerCase().includes(query)
    );
  }, [employees, searchQuery]);

  const handleClearAll = () => {
    onTagNameChange("");
    onClearEmployees?.();
  };

  const isAddDisabled = !selectedGroup || !tagName.trim();
  const isSaveDisabled = !selectedGroup || !tagName.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[753px] !max-w-none !p-7 !rounded-12 !border !border-gray-200 !bg-white">
        <div className="flex justify-between items-center">
          <DialogHeader className="!p-0">
            <DialogTitle className="text-[16px] font-semibold text-[#1A1A1A] leading-[19px]">
              Добавить тег
            </DialogTitle>
          </DialogHeader>
          <DialogClose variant="icon" />
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            <label className="block text-[14px] font-normal leading-5 tracking-[0.1px] text-[#141615] mb-2">
              Категория
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => onGroupChange(e.target.value)}
              className="w-full h-11 px-4 text-[16px] leading-6 tracking-[0.15px] text-[#141615] border border-[#D6D6D6] rounded-[8px] focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
            >
              <option value="" disabled className="text-[#7A7A7A]">
                Выберите категорию
              </option>
              {groups.map((group) => (
                <option key={group.key} value={group.key}>
                  {group.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-[14px] font-normal leading-5 tracking-[0.1px] text-[#141615] mb-2">
              Название
            </label>
            <Input
              placeholder="Например, Опыт в коучинге"
              value={tagName}
              onChange={(e) => onTagNameChange(e.target.value)}
              className="h-11 text-[16px] leading-6 tracking-[0.15px]"
              wrapperClassName="h-11"
            />
          </div>
        </div>

        {/* Блок с сотрудниками - показываем только если есть сотрудники */}
        {employees.length > 0 && (
          <div className="border border-[#D6D6D6] rounded-[8px] p-5 shadow-[3px_3px_10px_rgba(0,0,0,0.05)]">
            <div className="mb-3">
              <label className="block text-[14px] font-normal leading-5 tracking-[0.1px] text-[#141615] mb-2">
                Добавьте сотрудников
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <Input
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 text-[16px]"
                  wrapperClassName="h-11"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto mb-4">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center gap-2 p-2 border border-[#D6D6D6] rounded-[8px]"
                >
                  <Checkbox
                    checked={selectedEmployees.includes(employee.id)}
                    onCheckedChange={() => onEmployeeToggle?.(employee.id)}
                    className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
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
                    <div>
                      <div className="text-[14px] font-semibold leading-5 tracking-[0.1px] text-[#2C2A29]">
                        {employee.name}
                      </div>
                      <div className="text-[12px] font-normal leading-[14px] text-gray-500">
                        {employee.position}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredEmployees.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  Сотрудники не найдены
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClearAll}
                className="w-[102px] h-8 text-[14px] font-medium border-purple-500 text-[#141615] hover:bg-purple-50"
              >
                Очистить
              </Button>
              <Button
                onClick={onAdd}
                disabled={isAddDisabled}
                className="w-[118px] h-8 text-[14px] font-medium bg-purple-500 hover:bg-purple-600 text-white rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Добавить
              </Button>
            </div>
          </div>
        )}

        <p className="text-[12px] font-normal leading-[15px] tracking-[0.1px] text-[#7A7A7A]">
          Тег будет доступен HR и сотрудникам для фильтрации
        </p>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="plain"
            onClick={() => onOpenChange(false)}
            className="w-[105px] h-8 border border-purple-500 bg-white text-[14px] font-medium text-purple-500 hover:bg-purple-50 rounded-[8px]"
          >
            Отменить
          </Button>
          <Button
            onClick={onSave}
            disabled={isSaveDisabled}
            className="w-[111px] h-8 text-[14px] font-medium bg-purple-500 hover:bg-purple-600 text-white rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};