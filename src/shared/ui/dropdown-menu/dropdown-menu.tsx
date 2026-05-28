import * as React from "react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import { cn } from "@/shared/lib";

import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg";
import ArrowUpIcon from "@/shared/assets/icons/arrow-up.svg";

import type {
  DropdownMenuProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSubTriggerProps,
} from "./dropdown-menu-types";

const DropdownMenu = (props: DropdownMenuProps) => (
  <DropdownMenuPrimitive.Root {...props} />
);

const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

function DropdownMenuTrigger({
  className,
  children,
  hasArrow = false,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger> & {
  hasArrow?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Trigger
      className={cn(
        "group flex cursor-pointer items-center gap-3 hover:outline-1 hover:rounded-lg select-none hover:bg-gray-100 hover:outline-gray-200 data-[state=open]:outline-gray-200 data-[state=open]:bg-gray-100 data-[state=open]:outline-1 data-[state=open]:rounded-lg focus:outline-none focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
      {hasArrow && (
        <div className="relative size-5 shrink-0 m-3">
          <img
            src={ArrowDownIcon}
            alt=""
            className="absolute inset-0 transition-transform group-data-[state=open]:hidden"
          />
          <img
            src={ArrowUpIcon}
            alt=""
            className="absolute inset-0 hidden transition-transform group-data-[state=open]:block"
          />
        </div>
      )}
    </DropdownMenuPrimitive.Trigger>
  );
}

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-50 min-w-32 w-[var(--radix-dropdown-menu-trigger-width)] overflow-hidden rounded-[var(--radius-8)] bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10",
          "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
          "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-[var(--radius-8)] px-1.5 py-1 text-sm outline-none select-none",
        "focus:bg-accent focus:text-accent-foreground",
        inset && "pl-8",
        variant === "destructive" &&
          "text-destructive focus:bg-destructive/10 focus:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(
        "relative flex cursor-default items-center rounded-[var(--radius-8)] py-1.5 px-2 text-sm outline-none focus:bg-accent",
        className,
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        "relative flex cursor-default items-center rounded-[var(--radius-8)] py-1.5 px-2 text-sm outline-none focus:bg-accent",
        className,
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({ className, ...props }: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        "px-2 py-1.5 text-xs font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSubTrigger({
  className,
  children,
  ...props
}: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-[var(--radius-8)] px-2 py-1.5 text-sm outline-none focus:bg-accent",
        className,
      )}
      {...props}
    >
      {children}
      <img
        src={ArrowDownIcon}
        alt=""
        className="ml-auto size-3.5 -rotate-90 opacity-60"
      />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
};
