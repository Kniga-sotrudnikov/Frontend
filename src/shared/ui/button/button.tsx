import { type ReactNode, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/lib";
import { buttonVariants } from "./button-variants";
import { type ButtonProps } from "./button-types";

const renderIcon = (icon: ReactNode | string) => {
  if (typeof icon === "string") {
    return <img src={icon} alt="" aria-hidden="true" />;
  }
  return icon;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  className,
  variant,
  size,
  iconLeft,
  iconRight,
  asChild = false,
  children,
  ...props
}: ButtonProps, ref) {

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
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
})

export { Button };
