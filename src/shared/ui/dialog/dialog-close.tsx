import { type ComponentProps } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { Button } from "@ui/button";
import CloseIcon from "@icons/close.svg?react";

type VariantCloseButton = "default" | "icon" | "custom";

function DialogClose({
  variant = "default",
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Close> & {
  variant?: VariantCloseButton;
  children?: React.ReactNode;
}) {
  if (variant === "icon") {
    return (
      <DialogPrimitive.Close data-slot="dialog-close" asChild {...props}>
        <Button variant="ghost" size="icon-sm" className="p-1">
          <CloseIcon />
          <span className="sr-only">Close</span>
        </Button>
      </DialogPrimitive.Close>
    );
  }

  if (variant === "custom") {
    return (
      <DialogPrimitive.Close data-slot="dialog-close" asChild {...props}>
        {children}
      </DialogPrimitive.Close>
    );
  }

  return (
    <DialogPrimitive.Close data-slot="dialog-close" asChild {...props}>
      <Button variant="outline">Отменить</Button>
    </DialogPrimitive.Close>
  );
}

export { DialogClose };
