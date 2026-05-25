import { useState } from "react";
import { cn } from "@/shared/lib";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import CheckMarkIcon from "@/shared/assets/icons/check-mark.svg?react";
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg?react";
import CloseIcon from "@/shared/assets/icons/close.svg?react";
import { COMPETENCY_OPTIONS, type CompetencyOption } from "../model/types";

interface CompetenciesSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export const CompetenciesSelect = ({
  value,
  onChange,
  error,
}: CompetenciesSelectProps) => {
  const [open, setOpen] = useState(false);

  const toggleCompetency = (competency: CompetencyOption) => {
    if (value.includes(competency.id)) {
      onChange(value.filter((v) => v !== competency.id));
    } else {
      onChange([...value, competency.id]);
    }
  };

  const removeCompetency = (id: string) => {
    onChange(value.filter((v) => v !== id));
  };

  const selectedLabels = value.map(
    (id) => COMPETENCY_OPTIONS.find((opt) => opt.id === id)?.label || id,
  );

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-between font-normal mt-2",
              error && "border-red-600",
            )}
          >
            <span className={value.length === 0 ? "text-xs text-gray-400" : ""}>
              {value.length === 0
                ? "Выберите компетенции"
                : `Выбрано: ${value.length}`}
            </span>
            <ArrowDownIcon className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[280px] p-2" align="start">
          <div className="flex flex-col gap-1">
            {COMPETENCY_OPTIONS.map((option) => (
              <Button
                key={option.id}
                type="button"
                variant="plain"
                size="plain"
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between rounded-8 px-3 py-2 text-sm transition-colors hover:bg-gray-100",
                  value.includes(option.id) && "bg-purple-50",
                )}
                onClick={() => toggleCompetency(option)}
              >
                <span>{option.label}</span>
                {value.includes(option.id) && (
                  <CheckMarkIcon className="size-4 text-purple-500" />
                )}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {selectedLabels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedLabels.map((label) => (
            <Badge key={label} className="gap-1 border-purple-500 bg-purple-50 text-purple-500">
              {label}
              <Button
                type="button"
                variant="plain"
                size="icon-xs"
                onClick={() => removeCompetency(label)}
                className="ml-1 rounded-full hover:text-gray-700"
              >
                <CloseIcon className="size-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};