import { useState } from "react";

import { Button } from "@ui/button";
import { SearchInput } from "@ui/input/search-input";
import { DropdownMenuSeparator } from "@ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { FilterTrigger } from "@/features/employee/ui/filter-trigger";
import { FilterRemoveBadge } from "@/features/employee/ui/filter-remove-badge";
import { CheckboxSelect } from "@ui/checkbox-select";
import type { TCitiesFilterOption } from "@/features/employee";

interface TFilterCitiesProps {
  options: TCitiesFilterOption[];
  value: string[];
  onApply: (selected: string[]) => void;
}

export const FilterCities = ({
  options,
  value,
  onApply,
}: TFilterCitiesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [draftValue, setDraftValue] = useState<string[]>(value);

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  const filteredCities = normalizedSearchTerm
    ? options.filter((option) =>
        option.label.toLowerCase().includes(normalizedSearchTerm),
      )
    : options;

  const isClearButtonVisible = draftValue.length > 0 || searchTerm.length > 0;

  const activeFilters = options.filter((option) =>
    draftValue.includes(option.value),
  );

  const handleOpenChange = (nextOpen: boolean) => {
    setIsOpen(nextOpen);

    if (!nextOpen) {
      setSearchTerm("");
      setDraftValue(value);
    }
  };

  // Бэкенд поддерживает фильтрацию только по одному городу,
  // поэтому выбор одиночный: новая отметка заменяет предыдущую.
  const handleCheckboxChange = (nextValue: string[]) => {
    const added = nextValue.find((item) => !draftValue.includes(item));
    setDraftValue(added ? [added] : nextValue);
  };

  const handleRemoveFilter = (filter: string) => {
    setDraftValue((prev) => prev.filter((value) => value !== filter));
  };

  const handleResetFilters = () => {
    setDraftValue([]);
  };

  const handleClearAll = () => {
    setDraftValue([]);
    setSearchTerm("");
  };

  const handleApplyFilters = () => {
    onApply(draftValue);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <FilterTrigger
          selectedCount={draftValue.length}
          open={isOpen}
          label="Город"
        />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="p-6 w-85 max-h-[min(var(--radix-popover-content-available-height),750px)]"
        sideOffset={10}
      >
        <SearchInput
          wrapperClassName="h-11 shrink-0"
          placeholder="Поиск"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex justify-between mt-4">
          <span className="body-m-semibold">{`Активные фильтры (${draftValue.length})`}</span>
          <Button
            type="button"
            variant="link"
            size="plain"
            onClick={handleResetFilters}
          >
            Сбросить
          </Button>
        </div>

        <ul className="flex flex-wrap gap-1 mb-2.5">
          {activeFilters.map((filter) => (
            <li key={filter.value}>
              <FilterRemoveBadge
                label={filter.label}
                onRemove={() => handleRemoveFilter(filter.value)}
              />
            </li>
          ))}
        </ul>

        <div className="overflow-y-auto overflow-x-hidden">
          {filteredCities.length > 0 ? (
            <CheckboxSelect
              options={filteredCities}
              value={draftValue}
              onValueChange={(nextValue) => handleCheckboxChange(nextValue)}
            />
          ) : (
            <div className="body-m text-(--color-gray-500) mb-5">
              Ничего не найдено
            </div>
          )}
        </div>

        <DropdownMenuSeparator />

        <div className="flex self-end gap-2">
          {isClearButtonVisible && (
            <Button variant="outline" onClick={handleClearAll}>
              Очистить
            </Button>
          )}
          <Button onClick={handleApplyFilters}>Применить</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
