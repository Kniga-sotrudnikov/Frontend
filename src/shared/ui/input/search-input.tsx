import { forwardRef, useImperativeHandle, useRef } from "react";
import { Input } from "./input";
import { type InputProps } from "./input-types";
import SearchIcon from "@/shared/assets/icons/search.svg";
import CloseIcon from "@/shared/assets/icons/close.svg?react";

export interface SearchInputProps extends Omit<InputProps, "iconLeft"> {
  /** Показывать кнопку очистки, когда в поле есть текст */
  clearable?: boolean;
  onClear?: () => void;
}

/**
 * Сбрасывает значение через нативный сеттер, чтобы React увидел изменение
 * и вызвал onChange — нужно, когда onClear не передан.
 */
const emitEmptyChange = (
  input: HTMLInputElement | null,
  onChange: InputProps["onChange"],
) => {
  if (!input || !onChange) return;

  const setValue = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set;

  setValue?.call(input, "");
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput(
    { clearable = true, onClear, iconRight, ...props },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

    const showClear =
      clearable && !props.disabled && String(props.value ?? "").length > 0;

    const handleClear = () => {
      if (onClear) {
        onClear();
      } else {
        emitEmptyChange(inputRef.current, props.onChange);
      }
      inputRef.current?.focus();
    };

    return (
      <Input
        ref={inputRef}
        {...props}
        iconLeft={SearchIcon}
        iconRight={
          iconRight ??
          (showClear ? (
            <button
              type="button"
              aria-label="Очистить"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleClear}
              className="flex items-center justify-center hover:opacity-70 transition-opacity focus:outline-none"
            >
              <CloseIcon className="size-3.5" />
            </button>
          ) : undefined)
        }
        placeholder={props.placeholder || "Поиск..."}
      />
    );
  },
);

export { SearchInput };
