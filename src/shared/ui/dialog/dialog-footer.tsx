import { type ComponentProps } from "react";

import { cn } from "@/shared/lib";

function DialogFooter({
  className,
  divided = false,
  children,
  ...props
}: ComponentProps<"div"> & {
  showCloseButton?: boolean;
  divided?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-row", divided && "border-t pt-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { DialogFooter };
