import { type ComponentProps } from "react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button-variants";

export interface ButtonProps
  extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
