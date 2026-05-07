import { type ComponentProps } from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/shared/lib"

function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

export { DialogTitle }
