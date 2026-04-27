import { type ComponentProps, type ReactNode } from "react";

export interface InputProps extends ComponentProps<"input"> {
  iconLeft?: ReactNode | string;
  iconRight?: ReactNode | string;
  wrapperClassName?: string;
}
