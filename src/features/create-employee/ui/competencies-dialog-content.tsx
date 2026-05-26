import { Dialog, DialogContent } from "@ui/dialog";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Checkbox } from "@ui/checkbox";
import SearchIcon from "@/shared/assets/icons/search.svg?react";
import PlusIcon from "@/shared/assets/icons/plus.svg?react";
import type { CompetencyOption } from "../model/types";

interface CompetenciesDialogContentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  tempValue: string[];
  onToggleCompetency: (id: string) => void;
  filteredOptions: CompetencyOption[];
  onClear: () => void;
  onApply: () => void;
}

export const CompetenciesDialogContent = ({
  open,
  onOpenChange,
  searchQuery,
  onSearchChange,
  tempValue,
  onToggleCompetency,
  filteredOptions,
  onClear,
  onApply,
}: CompetenciesDialogContentProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[451px] h-auto !max-w-none !p-4 !rounded-6 !border !border-gray-200 !shadow-md !bg-white">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-start gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
              <Input
                placeholder="Поиск"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-7 h-11 text-base"
                wrapperClassName="h-9"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-9 h-9 p-0 flex items-center justify-center border-gray-200 rounded-md shrink-0"
              onClick={() => console.log("Add new tag")}
            >
              <PlusIcon className="size-5" />
            </Button>
          </div>

          <div className="border-t border-gray-200" />

          <p className="text-xs font-semibold text-black leading-6 tracking-[0.5px]">
            Компетенции
          </p>
          <div className="flex flex-col gap-1.5">
            {filteredOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-1 cursor-pointer hover:bg-gray-50"
              >
                <Checkbox
                  checked={tempValue.includes(option.id)}
                  onCheckedChange={() => onToggleCompetency(option.id)}
                />
                <span className="text-xs text-black leading-5 tracking-[-0.5px] whitespace-nowrap">
                  {option.label}
                </span>
              </label>
            ))}
          </div>

          <div className="border-t border-gray-200" />

          <div className="flex justify-start gap-2 pt-0 flex-shrink-0 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onClear}
              className="w-[102px] h-7 px-4 text-xs font-medium border-purple-500 text-black hover:bg-purple-50"
            >
              Очистить
            </Button>
            <Button
              type="button"
              onClick={onApply}
              className="w-[120px] h-7 px-4 text-xs font-medium bg-purple-500 hover:bg-purple-600 text-white rounded-md"
            >
              Применить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};