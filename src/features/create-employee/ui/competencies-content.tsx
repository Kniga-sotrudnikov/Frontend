import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Checkbox } from "@ui/checkbox";
import SearchIcon from "@/shared/assets/icons/search.svg?react";
import PlusIcon from "@/shared/assets/icons/plus.svg?react";
import type { CompetencyOption } from "../model/types";
import { cn } from "@/shared/lib";

interface CompetenciesContentProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  tempValue: string[];
  onToggleCompetency: (id: string) => void;
  options: CompetencyOption[];
  onClear: () => void;
  onApply: () => void;
  onShowAll?: () => void;
  hasMore?: boolean;
  showAll?: boolean;
  filteredCount?: number;
  variant?: "popover" | "dialog";
}

export const CompetenciesContent = ({
  searchQuery,
  onSearchChange,
  tempValue,
  onToggleCompetency,
  options,
  onClear,
  onApply,
  onShowAll,
  hasMore,
  showAll,
  filteredCount,
  variant = "popover",
}: CompetenciesContentProps) => {
  return (
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

      <div
        className={
          variant === "dialog" ? "flex flex-col gap-1.5" : "flex flex-col gap-1"
        }
      >
        {options.map((option) => (
          <label
            key={option.id}
            className={cn(
              "flex items-center gap-1 cursor-pointer",
              variant === "dialog" && "hover:bg-gray-50",
            )}
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

      {variant === "popover" && hasMore && !showAll && (
        <button
          type="button"
          onClick={onShowAll}
          className="text-xs text-gray-500 tracking-[-0.5px] hover:text-gray-700 text-left w-fit"
        >
          Показать все ({filteredCount})
        </button>
      )}

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
  );
};
