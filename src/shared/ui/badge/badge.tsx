import type { ComponentProps } from "react";
import { cn } from "@/shared/lib";

type TBadgeProps = ComponentProps<"div">;

export const Badge = ({ className, ...props }: TBadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex text-(length:--font-size-overline) rounded-(--radius-4) border px-2 py-0.5 leading-3.5",
        className,
      )}
      {...props}
    />
  );
};
