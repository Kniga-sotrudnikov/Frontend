import { useState, useMemo } from "react";
import { cn } from "@/shared/lib";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Dialog, DialogContent } from "@ui/dialog";
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
  const [fullDialogOpen, setFullDialogOpen] = useState(false);
  const [fullSearchQuery, setFullSearchQuery] = useState("");
  const [fullTempValue, setFullTempValue] = useState<string[]>(value);

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

  const handleFullToggleCompetency = (competencyId: string) => {
    setFullTempValue((prev) =>
      prev.includes(competencyId)
        ? prev.filter((id) => id !== competencyId)
        : [...prev, competencyId],
    );
  };

  const handleClear = () => {
    setTempValue([]);
  };

  const handleFullClear = () => {
    setFullTempValue([]);
  };

  const handleApply = () => {
    onChange(tempValue);
    setOpen(false);
  };

  const handleFullApply = () => {
    onChange(fullTempValue);
    setFullDialogOpen(false);
  };

  const handleRemoveCompetency = (id: string) => {
    const newValue = value.filter((v) => v !== id);
    onChange(newValue);
  };

  const handleOpenFullDialog = () => {
    setFullTempValue([...tempValue]);
    setFullSearchQuery("");
    setFullDialogOpen(true);
  };

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return COMPETENCY_OPTIONS;
    const query = searchQuery.toLowerCase();
    return COMPETENCY_OPTIONS.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const fullFilteredOptions = useMemo(() => {
    if (!fullSearchQuery.trim()) return COMPETENCY_OPTIONS;
    const query = fullSearchQuery.toLowerCase();
    return COMPETENCY_OPTIONS.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [fullSearchQuery]);

  const displayedOptions = showAll
    ? filteredOptions
    : filteredOptions.slice(0, VISIBLE_COUNT);
  const hasMore = filteredOptions.length > VISIBLE_COUNT;

  const selectedLabels = value.map(
    (id) => COMPETENCY_OPTIONS.find((opt) => opt.id === id)?.label || id,
  );

  const labelToIdMap = useMemo(() => {
    const map = new Map<string, string>();
    COMPETENCY_OPTIONS.forEach((opt) => {
      map.set(opt.label, opt.id);
    });
    return map;
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start font-normal h-[44px] mt-1 hover:bg-transparent",
              error && "border-red-600",
              !error && "border-gray-200",
            )}
          >
            <div className="flex flex-nowrap items-center gap-1 flex-1 min-w-0 overflow-hidden">
              {selectedLabels.length > 0 ? (
                selectedLabels.map((label) => {
                  const competencyId = labelToIdMap.get(label) || label;
                  return (
                    <Badge
                      key={label}
                      className="gap-1 bg-purple-50 text-purple-500 text-overline py-0.5 px-2 shrink-0"
                    >
                      {label}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCompetency(competencyId);
                        }}
                        className="ml-1 rounded-full p-0.5 transition-all hover:bg-purple-100"
>
  <CloseIcon className="size-2.5 text-purple-500 hover:text-purple-700" />
                      </button>
                    </Badge>
                  );
                })
              ) : (
                <span className="text-gray-400 text-sm">
                  Выберите компетенции
                </span>
              )}
            </div>
            <ArrowDownIcon className="size-4 opacity-50 shrink-0" />
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
            <p className="text-xs font-semibold text-black leading-6 tracking-[0.5px]">
              Компетенции
            </p>
            <div className="flex flex-col gap-1">
              {displayedOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <Checkbox
                    checked={tempValue.includes(option.id)}
                    onCheckedChange={() => handleToggleCompetency(option.id)}
                  />
                  <span className="text-xs text-black leading-5 tracking-[-0.5px] whitespace-nowrap">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Show all button */}
            {hasMore && !showAll && (
              <button
                type="button"
                onClick={handleOpenFullDialog}
                className="text-xs text-gray-500 tracking-[-0.5px] hover:text-gray-700 text-left w-fit"
              >
                Показать все ({filteredOptions.length})
              </button>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Buttons: Очистить и Применить */}
            <div className="flex justify-start gap-2 pt-0 flex-shrink-0 w-full">
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

      {/* Full dialog for "Показать все" */}
      <Dialog open={fullDialogOpen} onOpenChange={setFullDialogOpen}>
        <DialogContent className="!w-[451px] h-auto !max-w-none !p-4 !rounded-6 !border !border-gray-200 !shadow-md !bg-white">
          <div className="flex flex-col gap-2">
            {/* Search + Add tag */}
            <div className="flex flex-row items-start gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-5 text-gray-500" />
                <Input
                  placeholder="Поиск"
                  value={fullSearchQuery}
                  onChange={(e) => setFullSearchQuery(e.target.value)}
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

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Options list */}
            <p className="text-xs font-semibold text-black leading-6 tracking-[0.5px]">
              Компетенции
            </p>
            <div className="flex flex-col gap-1.5">
              {fullFilteredOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-1 max-h-[400px] cursor-pointer hover:bg-gray-50"
                >
                  <Checkbox
                    checked={fullTempValue.includes(option.id)}
                    onCheckedChange={() =>
                      handleFullToggleCompetency(option.id)
                    }
                  />
                  <span className="text-xs text-black leading-5 tracking-[-0.5px] whitespace-nowrap">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Buttons: Очистить и Применить */}
            <div className="flex justify-start gap-2 pt-0 flex-shrink-0 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={handleFullClear}
                className="w-[102px] h-7 px-4 text-xs font-medium border-purple-500 text-black hover:bg-purple-50"
              >
                Очистить
              </Button>
              <Button
                type="button"
                onClick={handleFullApply}
                className="w-[120px] h-7 px-4 text-xs font-medium bg-purple-500 hover:bg-purple-600 text-white rounded-md"
              >
                Применить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};
