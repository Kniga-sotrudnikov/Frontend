import { useState } from "react";

import type { TEmployeeStatus } from "@/entities/employee/model/types.ts";

import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Checkbox } from "@ui/checkbox";
import { FilterTrigger } from "./filter-trigger";
import { statusFilterOptions } from "@/entities/employee/model/constants";

type TStatusFilterProps = {
  value: TEmployeeStatus[];
  onValueChange: (value: TEmployeeStatus[]) => void;
};

export const StatusFilter = ({ value, onValueChange }: TStatusFilterProps) => {
  const [open, setOpen] = useState(false);

  const handleChecked = (status: TEmployeeStatus, checked: boolean) => {
    if (checked) {
      onValueChange([...value, status]);
      return;
    }

    onValueChange(value.filter((item) => item !== status));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FilterTrigger
          selectedCount={value.length}
          open={open}
          label="Статус"
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-5 w-auto min-w-54.5"
        sideOffset={10}
      >
        <ul className="flex flex-col gap-3.5">
          {statusFilterOptions.map((option) => {
            const checked = value.includes(option.value);

            return (
              <li key={option.value}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(checked) =>
                      handleChecked(option.value, checked === true)
                    }
                  />
                  <span>{option.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
