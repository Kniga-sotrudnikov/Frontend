import React, { useState, useRef, useEffect } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";
import { SearchInput } from "@/shared/ui/input/search-input";
import { Button } from "@/shared/ui/button";
import { DropdownMenuSeparator } from "@/shared/ui/dropdown-menu";
import { Checkbox } from "@/shared/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { FilterTrigger } from "@/features/employee/ui/filter-trigger";

interface FilterCitiesProps {
  cities: string[];
  selected?: string[];
  onChange?: (selected: string[]) => void;
}

const maxVisible = 5;

const FilterCities: React.FC<FilterCitiesProps> = ({
  cities,
  selected = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>(selected);
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowAll(false);
        setSearchTerm("");
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setSearchTerm("");
      setShowAll(false);
    }
  };

  const handleCheckboxChange = (city: string) => {
    const newSelected = selectedCities.includes(city)
      ? selectedCities.filter((c) => c !== city)
      : [...selectedCities, city];
    setSelectedCities(newSelected);
    onChange?.(newSelected);
  };

  const handleRemoveCity = (city: string) => {
    const newSelected = selectedCities.filter((c) => c !== city);
    setSelectedCities(newSelected);
    onChange?.(newSelected);
  };

  const handleRemoveCities = () => {
    setSelectedCities([]);
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const displayedCities = showAll
    ? filteredCities
    : filteredCities.slice(0, maxVisible);
  const hasMore = filteredCities.length > maxVisible && !showAll;

  return (
    <Popover open={isOpen} onOpenChange={toggleOpen}>
      <PopoverTrigger asChild>
        <FilterTrigger
          selectedCount={selectedCities.length}
          open={isOpen}
          label="Город"
        />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="p-5 w-auto min-w-54.5"
        sideOffset={10}
      >
        <div className="relative mb-3">
          <SearchInput
            placeholder="Город"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowAll(false);
            }}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="text-s font-semibold mb-1">
            Активные фильтры ({selectedCities.length}):
          </div>
          <Button
            type="button"
            className="p-0 text-[var(--primary)]"
            variant="ghost"
            size="default"
            onClick={handleRemoveCities}
          >
            Сбросить
          </Button>
        </div>
        {selectedCities.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {selectedCities.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center px-2 py-0.5 h-[24px]  text-xs rounded-md font-medium bg-[var(--secondary)] text-[var(--primary)]"
                >
                  {city}
                  <button
                    type="button"
                    className="ml-1 inline-flex items-center p-0.5 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveCity(city);
                    }}
                  >
                    <img
                      src={CloseIcon}
                      alt=""
                      className="ml-auto h-3 w-3 shrink-0"
                    />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="max-h-60 overflow-y-auto">
          {displayedCities.length > 0 ? (
            displayedCities.map((city) => (
              <label
                key={city}
                className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
              >
                <Checkbox
                  checked={selectedCities.includes(city)}
                  onCheckedChange={() => handleCheckboxChange(city)}
                />
                <span className="ml-2">{city}</span>
              </label>
            ))
          ) : (
            <div className="text-sm text-gray-500 px-2 py-3">
              Ничего не найдено
            </div>
          )}
        </div>

        {hasMore && (
          <button
            type="button"
            className="mt-2 w-full text-left text-sm text-gray-600 hover:text-indigo-800 font-medium px-2 py-1 rounded hover:bg-indigo-50"
            onClick={() => setShowAll(true)}
          >
            Показать все ({filteredCities.length})
          </button>
        )}
        <DropdownMenuSeparator />

        <div className="h-[32px] mt-4 flex justify-end gap-[12px]">
          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={handleRemoveCities}
          >
            Очистить
          </Button>
          <Button
            type="button"
            variant="default"
            size="default"
            onClick={() => {}}
          >
            Применить
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterCities;
