import React, { useState, useRef, useEffect } from 'react';
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg";
import CloseIcon from "@/shared/assets/icons/close.svg"
import { SearchInput } from '@/shared/ui/input/search-input';
import {Button} from '@/shared/ui/button'
import { DropdownMenuSeparator } from '@/shared/ui/dropdown-menu';

interface FilterCitiesProps {
  cities: string[];
  selected?: string[];
  onChange?: (selected: string[]) => void;
}

  const maxVisible = 5;


const FilterCities: React.FC<FilterCitiesProps> = ({ cities, selected = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>(selected);
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowAll(false);
        setSearchTerm('');
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setSearchTerm('');
      setShowAll(false);
    }
  };

  const handleCheckboxChange = (city: string) => {
    const newSelected = selectedCities.includes(city)
      ? selectedCities.filter(c => c !== city)
      : [...selectedCities, city];
    setSelectedCities(newSelected);
    onChange?.(newSelected);
  };

  const handleRemoveCity = (city: string) => {
    const newSelected = selectedCities.filter(c => c !== city);
    setSelectedCities(newSelected);
    onChange?.(newSelected);
  };

  const handleRemoveCities = () => {
    setSelectedCities([]);
  };

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCities = showAll ? filteredCities : filteredCities.slice(0, maxVisible);
  const hasMore = filteredCities.length > maxVisible && !showAll;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Триггер - поле с номером (количество выбранных городов) */}
      <button
        type="button"
        className="w-[204px] h-[32px] flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={toggleOpen}
      >
        <span className="text-[14px] text-gray-600">Город</span>
        {selectedCities.length > 0 && (
          <span className="ml-2 inline-flex items-center justify-center w-[23px] h-[23px] text-xs font-semibold text-white bg-indigo-600 rounded-[var(--radius-8)]">
            {selectedCities.length}
          </span>
        )}
        <img
            src={ArrowDownIcon}
            alt=""
            className="ml-auto h-5 w-5 shrink-0"
        />
      </button>

      {/* Выпадающее окно */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-84 bg-white rounded-md shadow-lg border border-gray-200 p-6">
          {/* Поисковая строка */}
          <div className="relative mb-3">
            <SearchInput placeholder="Город" value={searchTerm} onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowAll(false);
              }}/>
          </div>

          {/* Список уже выбранных городов */}
          <div className="flex justify-between items-center">
            <div className="text-s font-semibold mb-1">Активные фильтры ({selectedCities.length}):</div>
            <Button
                type="button"
                className="p-0"
                variant="link"
                size="default"
                onClick={handleRemoveCities}
                >
                    Сбросить
                </Button>
            </div>
          {selectedCities.length > 0 && (
            <div className="mb-3">
              
              <div className="flex flex-wrap gap-1">
                {selectedCities.map(city => (
                  <span key={city} className="inline-flex items-center px-2 py-0.5 h-[24px]  text-xs rounded-md font-medium bg-[var(--secondary)] text-[var(--primary)]">
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

          {/* Чекбокс лист городов */}
          <div className="max-h-60 overflow-y-auto">
            {displayedCities.length > 0 ? (
              displayedCities.map(city => (
                <label key={city} className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 bg-(--secondary) text-indigo-(-primary) accent-(--primary) border-gray-300 rounded-md focus:ring-indigo-900"
                    checked={selectedCities.includes(city)}
                    onChange={() => handleCheckboxChange(city)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{city}</span>
                </label>
              ))
            ) : (
              <div className="text-sm text-gray-500 px-2 py-3">Ничего не найдено</div>
            )}
          </div>

          {/* Кнопка "Показать все", если есть скрытые */}
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

          {/* Кнопки Очистить и применить */}
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
        </div>
      )}
    </div>
  );
};

export default FilterCities;