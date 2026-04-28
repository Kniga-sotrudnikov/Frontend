import { type ComponentProps } from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

export type DropdownMenuProps = ComponentProps<
  typeof DropdownMenuPrimitive.Root
>;

export type DropdownMenuItemProps = ComponentProps<
  typeof DropdownMenuPrimitive.Item
> & {
  inset?: boolean;
  variant?: "default" | "destructive";
};

export type DropdownMenuCheckboxItemProps = ComponentProps<
  typeof DropdownMenuPrimitive.CheckboxItem
>;

export type DropdownMenuRadioItemProps = ComponentProps<
  typeof DropdownMenuPrimitive.RadioItem
>;

export type DropdownMenuLabelProps = ComponentProps<
  typeof DropdownMenuPrimitive.Label
>;

export type DropdownMenuSubTriggerProps = ComponentProps<
  typeof DropdownMenuPrimitive.SubTrigger
>;