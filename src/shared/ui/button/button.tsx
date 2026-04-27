import * as React from "react";
import { Slot } from "radix-ui";
import { Link, type LinkProps } from "react-router";
import { cn } from "@/shared/lib";
import { buttonVariants } from "./button-variants";
import { type ButtonProps, type ButtonBaseProps } from "./button-types";

function Button({
  className,
  variant,
  size,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps) {
  const renderIcon = (icon: React.ReactNode | string) => {
    if (typeof icon === "string") {
      return <img src={icon} alt="" aria-hidden="true" />;
    }
    return icon;
  };

  const content = (
    <>
      {iconLeft && (
        <span className="inline-flex shrink-0">{renderIcon(iconLeft)}</span>
      )}
      {children}
      {iconRight && (
        <span className="inline-flex shrink-0">{renderIcon(iconRight)}</span>
      )}
    </>
  );

  const commonClassName = cn(buttonVariants({ variant, size, className }));

  // Проверяем, является ли компонент ссылкой
  if ("to" in props) {
    const { to, ...linkProps } = props as LinkProps & ButtonBaseProps;
    return (
      <Link to={to} className={commonClassName} {...linkProps}>
        {content}
      </Link>
    );
  }

  // Если не ссылка, значит это обычная кнопка (возможно с asChild)
  const { asChild = false, ...buttonProps } =
    props as React.ComponentProps<"button"> & { asChild?: boolean };
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={commonClassName}
      {...buttonProps}
    >
      {content}
    </Comp>
  );
}

export { Button };
