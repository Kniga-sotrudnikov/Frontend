import * as React from "react";
import { cn } from "@/shared/lib";
import { type InputProps } from "./input-types.ts";

function Input({
  className,
  type,
  iconLeft,
  iconRight,
  wrapperClassName,
  ...props
}: InputProps) {
  const renderIcon = (icon: React.ReactNode | string) => {
    if (typeof icon === "string") {
      return (
        <img src={icon} alt="" aria-hidden="true" className="size-4 shrink-0" />
      );
    }
    return icon;
  };

  return (
    <div
      data-slot="input-wrapper"
      className={cn(
        // Теперь рамка, радиус 8px и фокус здесь
        "group flex h-8 w-full items-center gap-2 rounded-[var(--radius-8)] border border-input bg-transparent px-2.5 transition-colors",
        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        "has-[:disabled]:pointer-events-none has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-input/50 has-[:disabled]:opacity-50",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-3 aria-[invalid=true]:ring-destructive/20",
        wrapperClassName,
      )}
    >
      {iconLeft && (
        <div className="flex shrink-0 items-center text-muted-foreground">
          {renderIcon(iconLeft)}
        </div>
      )}

      <input
        type={type}
        data-slot="input"
        className={cn(
          "flex h-full w-full min-w-0 bg-transparent py-1 text-base outline-none placeholder:text-muted-foreground md:text-sm",
          className,
        )}
        {...props}
      />

      {iconRight && (
        <div className="flex shrink-0 items-center text-muted-foreground">
          {renderIcon(iconRight)}
        </div>
      )}
    </div>
  );
}

export { Input };
