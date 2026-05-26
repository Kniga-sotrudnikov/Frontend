import { useState, useMemo } from "react";
import { cn } from "@/shared/lib";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Checkbox } from "@ui/checkbox";
import SearchIcon from "@/shared/assets/icons/search.svg?react";
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg?react";
import CloseIcon from "@/shared/assets/icons/close.svg?react";
import PlusIcon from "@/shared/assets/icons/plus.svg?react";
import { COMPETENCY_OPTIONS } from "../model/types";

interface CompetenciesSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

const VISIBLE_COUNT = 5;

export const CompetenciesSelect = ({
  value,
  onChange,
  error,
}: CompetenciesSelectProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempValue, setTempValue] = useState<string[]>(value);
  const [showAll, setShowAll] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setTempValue([...value]);
      setSearchQuery("");
      setShowAll(false);
    }
  };

  const handleToggleCompetency = (competencyId: string) => {
    setTempValue((prev) =>
      prev.includes(competencyId)
        ? prev.filter((id) => id !== competencyId)
        : [...prev, competencyId],
    );
  };

  const handleClear = () => {
    setTempValue([]);
  };

  const handleApply = () => {
    onChange(tempValue);
    setOpen(false);
  };

  const handleRemoveCompetency = (id: string) => {
    const newValue = value.filter((v) => v !== id);
    onChange(newValue);
  };

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return COMPETENCY_OPTIONS;
    const query = searchQuery.toLowerCase();
    return COMPETENCY_OPTIONS.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const displayedOptions = showAll
    ? filteredOptions
    : filteredOptions.slice(0, VISIBLE_COUNT);
  const hasMore = filteredOptions.length > VISIBLE_COUNT;

  const selectedLabels = value.map(
    (id) => COMPETENCY_OPTIONS.find((opt) => opt.id === id)?.label || id,
  );

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-between font-normal h-[44px] mt-1",
              error && "border-red-600",
              !error && "border-gray-200",
            )}
          >
            <span
              className={
                value.length === 0 ? "text-gray-400 text-sm" : "text-sm"
              }
            >
              {value.length === 0
                ? "Выберите компетенции"
                : `Выбрано: ${value.length}`}
            </span>
            <ArrowDownIcon className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[368px] p-4 rounded-6 border border-gray-200 shadow-md"
          align="start"
          sideOffset={8}
        >
          <div className="flex flex-col gap-2">
            {/* Search + Add tag */}
            <div className="flex flex-row items-start gap-2">
              {/* Search Field */}
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
                <Input
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-7 h-11 text-base"
                  wrapperClassName="h-9"
                />
              </div>

              {/* Add tag button */}
              <Button
                type="button"
                variant="outline"
                className="w-9 h-9 p-0 flex items-center justify-center border-gray-200 rounded-md shrink-0"
                onClick={() => {
                  // TODO: открыть модалку добавления нового тега
                  console.log("Add new tag");
                }}
              >
                <PlusIcon className="size-5" />
              </Button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Options list */}
            <p className="text-sm font-semibold text-black leading-7 tracking-[-1.25px]">
              Компетенции
            </p>
            <div className="flex flex-col gap-1">
              {displayedOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-1 cursor-pointer hover:bg-gray-50"
                >
                  <Checkbox
                    checked={tempValue.includes(option.id)}
                    onCheckedChange={() => handleToggleCompetency(option.id)}
                  />
                  <span className="text-xs text-black leading-5 tracking-[-0.5px] whitespace-nowrap overflow-x-auto scrollbar-none">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Show all button */}
            {hasMore && !showAll && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="text-xs text-gray-500 tracking-[-0.5px] hover:text-gray-700 text-left w-fit"
              >
                Показать все ({filteredOptions.length})
              </button>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Buttons: Очистить и Применить */}
            <div className="flex justify-ыефке gap-2 pt-0 flex-shrink-0 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                className="w-[102px] h-7 px-4 text-xs font-medium border-purple-500 text-black hover:bg-purple-50"
              >
                Очистить
              </Button>
              <Button
                type="button"
                onClick={handleApply}
                className="w-[120px] h-7 px-4 text-xs font-medium bg-purple-500 hover:bg-purple-600 text-white rounded-md"
              >
                Применить
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Selected competencies badges */}
      {selectedLabels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedLabels.map((label) => (
            <Badge
              key={label}
              className="gap-1 border-purple-500 bg-purple-50 text-purple-500"
            >
              {label}
              <button
                type="button"
                onClick={() => handleRemoveCompetency(label)}
                className="ml-1 rounded-full hover:text-gray-700"
              >
                <CloseIcon className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};
