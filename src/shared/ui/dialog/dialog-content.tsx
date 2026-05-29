import { type ComponentProps } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/shared/lib";
import { DialogPortal } from "./dialog-portal";
import { DialogOverlay } from "./dialog-overlay";

function DialogContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] max-h-[calc(100vh-4rem)] overflow-y-auto -translate-x-1/2 -translate-y-1/2 gap-5 rounded-lg bg-popover p-6 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export { DialogContent };
