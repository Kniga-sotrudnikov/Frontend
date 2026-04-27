import { type ComponentProps, type ReactNode } from "react";
import { type Link } from "react-router";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button-variants";

export interface ButtonBaseProps extends VariantProps<typeof buttonVariants> {
  iconLeft?: ReactNode | string;
  iconRight?: ReactNode | string;
}

export type ButtonProps = ButtonBaseProps &
  (
    | (ComponentProps<"button"> & { to?: never; asChild?: boolean })
    | (ComponentProps<typeof Link> & { to: string; asChild?: never })
  );
