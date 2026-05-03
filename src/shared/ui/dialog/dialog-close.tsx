import { type ComponentProps } from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { Button } from "@ui/button"
import CloseIcon from "@icons/close.svg?react"

type VariantCloseButton = "default" | "icon"

function DialogClose({
  variant = "default",
  ...props
}: ComponentProps<typeof DialogPrimitive.Close>
& {variant?: VariantCloseButton}) {
  if (variant === "default") {
    return (
      <DialogPrimitive.Close data-slot="dialog-close" asChild {...props}>
        <Button variant="outline">Отменить</Button>
      </DialogPrimitive.Close>
    )
  } else if (variant === "icon") {
    return (
      <DialogPrimitive.Close asChild>
        <Button variant="ghost" size="icon-sm" className="p-1">
          <CloseIcon />
          <span className="sr-only">Close</span>
        </Button>
      </DialogPrimitive.Close>
    ) 
  }
}

export { DialogClose }
