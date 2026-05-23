import { forwardRef, useState } from "react";
import { Input } from "./input";
import { type InputProps } from "./input-types";
import EyeVisibleIcon from "@/shared/assets/icons/eye-visible.svg";
import EyeHiddenIcon from "@/shared/assets/icons/eye-hidden.svg";

const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "iconRight" | "type">
>(function PasswordInput(props, ref) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      ref={ref}
      {...props}
      type={showPassword ? "text" : "password"}
      iconRight={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none"
        >
          <img
            src={showPassword ? EyeHiddenIcon : EyeVisibleIcon}
            alt={showPassword ? "Скрыть" : "Показать"}
          />
        </button>
      }
    />
  );
});

export { PasswordInput };
