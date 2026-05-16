import { useState } from "react";
import { Checkbox } from "@ui/checkbox";
import { Button } from "@ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/collapsible";

import ArrowDownIcon from "@icons/arrow-down.svg?react";
import ArrowUpIcon from "@icons/arrow-up.svg?react";

type TCheckboxSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TCheckboxSelectProps = {
  options: TCheckboxSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  visibleCount?: number;
  title?: string;
};

export const CheckboxSelect = ({
  options,
  value,
  onValueChange,
  visibleCount = 4,
  title = "Выберите",
}: TCheckboxSelectProps) => {
  const [open, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const visibleOptions = options.slice(0, visibleCount);
  const hiddenOptions = options.slice(visibleCount);
  const hiddenOptionsCount = hiddenOptions.length;

  const handleChecked = (optionValue: string, checked: boolean) => {
    if (checked) {
      onValueChange([...value, optionValue]);
      return;
    }

    onValueChange(value.filter((item) => item !== optionValue));
  };

  const handleOpen = (openState: boolean) => {
    setIsOpen(openState);
    if (!openState) {
      setExpanded(false);
    }
  };

  const renderOptions = (options: TCheckboxSelectOption[]) => {
    return (
      <ul className="flex flex-col gap-3.5 mb-3.5">
        {options.map((option) => {
          const checked = value.includes(option.value);

          return (
            <li key={option.value}>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={checked}
                  disabled={option.disabled}
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
    );
  };

  return (
    <Collapsible open={open} onOpenChange={handleOpen} className="w-full">
      <CollapsibleTrigger asChild className="mb-2.75">
        <Button
          variant="plain"
          size="plain"
          className="flex justify-between w-full"
        >
          <span className="text-(length:--font-size-body-m)">{title}</span>
          {open ? (
            <ArrowUpIcon className="size-5" />
          ) : (
            <ArrowDownIcon className="size-5" />
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        {renderOptions(visibleOptions)}

        {hiddenOptionsCount > 0 && (
          <Collapsible open={expanded} onOpenChange={setExpanded}>
            {!expanded && (
              <CollapsibleTrigger asChild>
                <Button
                  variant="plain"
                  size="plain"
                  className="font-(--font-weight-regular) text-(--color-gray-600)"
                >
                  {`Показать все (${hiddenOptionsCount})`}
                </Button>
              </CollapsibleTrigger>
            )}

            <CollapsibleContent>
              {renderOptions(hiddenOptions)}

              {expanded && (
                <CollapsibleTrigger asChild>
                  <Button
                    variant="plain"
                    size="plain"
                    className="font-(--font-weight-regular) text-(--color-gray-600)"
                  >
                    {`Скрыть`}
                  </Button>
                </CollapsibleTrigger>
              )}
            </CollapsibleContent>
          </Collapsible>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
