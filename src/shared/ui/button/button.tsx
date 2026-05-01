import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/lib";
import { buttonVariants } from "./button-variants";
import { type ButtonProps } from "./button-types";
import { forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

export { Button };
