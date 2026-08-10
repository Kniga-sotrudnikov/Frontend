import { useRef, useState, type ChangeEvent, type FocusEvent } from "react";
import { SearchInput } from "@/shared/ui/input";
import type { EmployeeData } from "@/entities/employee";
import { useSearchSuggest } from "../model/use-search-suggest";

interface SearchSuggestInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  /** Вызывается при выборе подсказки из выпадающего списка */
  onSelect: (employee: EmployeeData) => void;
  placeholder?: string;
  wrapperClassName?: string;
}

/**
 * Поисковый инпут с саджестом: под полем появляется дропдаун
 * со списком подходящих сотрудников.
 */
export const SearchSuggestInput = ({
  value,
  onChange,
  onClear,
  onSelect,
  placeholder,
  wrapperClassName,
}: SearchSuggestInputProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { suggestions } = useSearchSuggest(value);

  const isOpen = isFocused && suggestions.length > 0;

  const handleBlur = (event: FocusEvent) => {
    if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
      setIsFocused(false);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
    >
      <SearchInput
        wrapperClassName={wrapperClassName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClear={onClear}
      />

      {isOpen && (
        <ul className="absolute inset-x-0 top-full z-50 mt-1 max-h-72 overflow-y-auto rounded-[var(--radius-8)] border border-gray-200 bg-white py-1 shadow-lg">
          {suggestions.map((employee) => (
            <li key={employee.id}>
              <button
                type="button"
                className="block w-full px-3 py-2 text-left transition-colors hover:bg-gray-50"
                // preventDefault, чтобы инпут не терял фокус до обработки клика
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onSelect(employee);
                  setIsFocused(false);
                }}
              >
                <span className="text-sm font-medium text-gray-900">
                  {employee.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
