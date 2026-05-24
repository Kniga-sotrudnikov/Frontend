import { cn } from "@/shared/lib";
import { Input } from "@ui/input";
import type { ComponentProps } from "react";

type InputProps = ComponentProps<typeof Input>;

interface FormInputProps extends InputProps {
  error?: boolean;
}

export const FormInput = ({ className, wrapperClassName, error, ...props }: FormInputProps) => {
  return (
    <Input
      {...props}
      height="44px"
      wrapperClassName={cn(
        "h-[44px] !px-3 mt-1",
        error && "border-red-600",
        wrapperClassName
      )}
      className={cn("!py-0 text-base placeholder:text-black/50 h-full tracking-[0.75px]", className)}
    />
  );
};