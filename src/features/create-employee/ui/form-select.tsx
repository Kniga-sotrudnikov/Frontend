import * as Select from "@radix-ui/react-select";
import { cn } from "@/shared/lib";
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg?react";
import CheckMarkIcon from "@/shared/assets/icons/check-mark.svg?react";

interface FormSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  error?: boolean;
}

export const FormSelect = ({
  value,
  onValueChange,
  options,
  placeholder,
  error,
}: FormSelectProps) => (
  <Select.Root value={value} onValueChange={onValueChange}>
    <Select.Trigger
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={cn(
        "flex h-[44px] w-full items-center justify-between rounded-md border border-input bg-white px-3 py-3 text-xs shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1",
        error && "border-red-600",
      )}
    >
      <Select.Value placeholder={placeholder} />
      <Select.Icon>
        <ArrowDownIcon className="size-4 opacity-50" />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
        <Select.Viewport className="p-1">
          {options.map((option) => (
            <Select.Item
              key={option.value}
              value={option.value}
              className="relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-xs outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <Select.ItemIndicator className="absolute left-2 inline-flex size-3.5 items-center justify-center">
                <CheckMarkIcon className="size-4" />
              </Select.ItemIndicator>
              <Select.ItemText>{option.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);
