import { useState, useMemo } from "react";
import { cn } from "@/shared/lib";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg?react";
import CloseIcon from "@/shared/assets/icons/close.svg?react";
import { COMPETENCY_OPTIONS } from "../model/constants";
import { CompetenciesPopoverContent } from "./competencies-popover-content";
import { CompetenciesDialogContent } from "./competencies-dialog-content";

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
        : [...prev, competencyId]
    );
  };

  const handleFullToggleCompetency = (competencyId: string) => {
    setFullTempValue((prev) =>
      prev.includes(competencyId)
        ? prev.filter((id) => id !== competencyId)
        : [...prev, competencyId]
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
      option.label.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const fullFilteredOptions = useMemo(() => {
    if (!fullSearchQuery.trim()) return COMPETENCY_OPTIONS;
    const query = fullSearchQuery.toLowerCase();
    return COMPETENCY_OPTIONS.filter((option) =>
      option.label.toLowerCase().includes(query)
    );
  }, [fullSearchQuery]);

  const displayedOptions = showAll
    ? filteredOptions
    : filteredOptions.slice(0, VISIBLE_COUNT);
  const hasMore = filteredOptions.length > VISIBLE_COUNT;

  const selectedLabels = value.map(
    (id) => COMPETENCY_OPTIONS.find((opt) => opt.id === id)?.label || id
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
              !error && "border-gray-200"
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
          <CompetenciesPopoverContent
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            tempValue={tempValue}
            onToggleCompetency={handleToggleCompetency}
            displayedOptions={displayedOptions}
            onClear={handleClear}
            onApply={handleApply}
            onShowAll={handleOpenFullDialog}
            hasMore={hasMore}
            showAll={showAll}
            filteredCount={filteredOptions.length}
          />
        </PopoverContent>
      </Popover>

      <CompetenciesDialogContent
        open={fullDialogOpen}
        onOpenChange={setFullDialogOpen}
        searchQuery={fullSearchQuery}
        onSearchChange={setFullSearchQuery}
        tempValue={fullTempValue}
        onToggleCompetency={handleFullToggleCompetency}
        filteredOptions={fullFilteredOptions}
        onClear={handleFullClear}
        onApply={handleFullApply}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};