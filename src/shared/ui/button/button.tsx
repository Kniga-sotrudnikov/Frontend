import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/shared/lib";
import { buttonVariants } from "./button-variants";
import { type ButtonProps } from "./button-types";

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
