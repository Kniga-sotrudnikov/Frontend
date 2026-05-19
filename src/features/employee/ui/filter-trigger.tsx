import { forwardRef, type ComponentProps } from "react";

import { Button } from "@ui/button";
import ArrowDownIcon from "@icons/arrow-down.svg?react";
import ArrowUpIcon from "@icons/arrow-up.svg?react";
import { cn } from "@/shared/lib";

type TFilterTriggerProps = ComponentProps<typeof Button> & {
  value: string[];
  label: string;
  open: boolean;
};

export const FilterTrigger = forwardRef<HTMLButtonElement, TFilterTriggerProps>(
  function FilterTrigger({ value, label, open, className, ...props }, ref) {
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
          <span className="font-(--font-weight-regular) text-(--color-gray-500)">
            {label}
          </span>
          {value.length > 0 && (
            <span className="flex items-center justify-center size-5.75 rounded-(--radius-4) bg-[#D6D6D64D] text-(length:--font-size-overline) leading-none">
              {value.length}
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
