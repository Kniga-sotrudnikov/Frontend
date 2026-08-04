import * as RadixSelect from "@radix-ui/react-select";
import { cn } from "@/shared/lib";
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg?react";
import CheckMarkIcon from "@/shared/assets/icons/check-mark.svg?react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  error?: boolean;
  onScrollEnd?: () => void;
}

export const Select = ({
  value,
  onValueChange,
  options,
  placeholder,
  error,
  onScrollEnd,
}: SelectProps) => (
  <RadixSelect.Root value={value} onValueChange={onValueChange}>
    <RadixSelect.Trigger
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={cn(
        "flex h-8 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-xs shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-red-600",
      )}
    >
      <RadixSelect.Value placeholder={placeholder} />
      <RadixSelect.Icon>
        <ArrowDownIcon className="size-4 opacity-50" />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
    <RadixSelect.Portal>
      <RadixSelect.Content
        position="popper"
        sideOffset={4}
        align="start"
        avoidCollisions
        collisionPadding={8}
        className="z-50 max-h-96 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
      >
        <RadixSelect.Viewport
          className="p-1 overflow-y-auto max-h-60"
          onScroll={(e) => {
            const target = e.currentTarget;
            const isNearBottom =
              target.scrollTop + target.clientHeight >=
              target.scrollHeight - 20;

            if (isNearBottom) {
              onScrollEnd?.();
            }
          }}
        >
          {options.map((option) => (
            <RadixSelect.Item
              key={option.value}
              value={option.value}
              className="relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-xs outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              <RadixSelect.ItemIndicator className="absolute left-2 inline-flex size-3.5 items-center justify-center">
                <CheckMarkIcon className="size-4" />
              </RadixSelect.ItemIndicator>
              <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
            </RadixSelect.Item>
          ))}
        </RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  </RadixSelect.Root>
);
