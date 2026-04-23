import type { ComponentProps } from "react"
import { type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { buttonVariants } from "./button-variants"
import { cn } from "@/shared/lib"

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }