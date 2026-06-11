import { type ComponentProps } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

function Dialog({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export { Dialog };
