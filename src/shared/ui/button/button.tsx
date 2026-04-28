import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/lib";
import { buttonVariants } from "./button-variants";
import { type ButtonProps } from "./button-types";

// Хелпер вынесен за пределы компонента по предыдущему замечанию
const renderIcon = (icon: React.ReactNode | string) => {
  if (typeof icon === "string") {
    return <img src={icon} alt="" aria-hidden="true" />;
  }
  return icon;
};

function Button({
  className,
  variant,
  size,
  iconLeft,
  iconRight,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  // Определяем базовый компонент: если asChild, то используем Slot, иначе обычная кнопка
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {iconLeft && (
        <span className="inline-flex shrink-0">{renderIcon(iconLeft)}</span>
      )}
      {children}
      {iconRight && (
        <span className="inline-flex shrink-0">{renderIcon(iconRight)}</span>
      )}
    </Comp>
  );
}

export { Button };
