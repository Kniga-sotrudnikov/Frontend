import { type ComponentProps } from "react";

import { cn } from "@/shared/lib";

function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-row items-center", className)}
      {...props}
    />
  );
}

export { DialogHeader };
