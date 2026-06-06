import { forwardRef, type ComponentProps } from "react";

import { Button } from "@ui/button";
import ArrowDownIcon from "@icons/arrow-down.svg?react";
import ArrowUpIcon from "@icons/arrow-up.svg?react";
import { cn } from "@/shared/lib";

type TFilterTriggerProps = ComponentProps<typeof Button> & {
  selectedCount: number;
  label: string;
  open: boolean;
};

export const FilterTrigger = forwardRef<HTMLButtonElement, TFilterTriggerProps>(
  function FilterTrigger(
    { selectedCount, label, open, className, ...props },
    ref,
  ) {
    return (
      <Button
        ref={ref}
        type="button"
        variant="plain"
        size="plain"
        className={cn(
          "flex justify-between min-w-51 h-8 px-3 border border-border bg-background",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2.5">
          <span className="font-regular text-(--color-gray-500)">{label}</span>
          {selectedCount > 0 && (
            <span className="flex items-center justify-center size-5.75 rounded-(--radius-4) bg-(--color-gray-100) body-overline font-medium leading-none">
              {selectedCount}
            </span>
          )}
        </div>

        {open ? (
          <ArrowUpIcon className="size-4" />
        ) : (
          <ArrowDownIcon className="size-4" />
        )}
      </Button>
    );
  },
);
