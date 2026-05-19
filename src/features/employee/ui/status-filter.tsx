import { useState } from "react";

import type { TEmployeeStatus } from "@/entities/employee/model/types.ts";

import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Checkbox } from "@ui/checkbox";
import { FilterTrigger } from "./filter-trigger";

type TStatusFilterProps = {
  value: TEmployeeStatus[];
  onValueChange: (value: TEmployeeStatus[]) => void;
};

const statusOptions: { value: TEmployeeStatus; label: string }[] = [
  { value: "active", label: "В работе" },
  { value: "vacation", label: "В отпуске" },
  { value: "sick", label: "На больничном" },
  { value: "maternity", label: "В декрете" },
];

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
        <FilterTrigger value={value} open={open} label="Статус" />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="p-5 w-auto min-w-54.5"
        sideOffset={10}
      >
        <ul className="flex flex-col gap-3.5">
          {statusOptions.map((option) => {
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
                  <span className="text-(length:--font-size-body-s)">
                    {option.label}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
