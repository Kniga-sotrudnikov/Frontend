import { useState } from "react";

import { Button } from "@ui/button";
import { FilterTrigger } from "@/features/employee/ui/filter-trigger";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { CheckboxSelect } from "@ui/checkbox-select";
import { DropdownMenuSeparator } from "@ui/dropdown-menu";
import { SearchInput } from "@ui/input";
import { FilterRemoveBadge } from "@/features/employee/ui/filter-remove-badge";
import { TagsManager } from "./tags-manager";
import type {
  TExpertiseFilterGroup,
  TExpertiseFilterValue,
} from "@/features/employee/model/types";
import FilterIcon from "@icons/filter.svg?react";
import EditIcon from "@icons/edit.svg?react";

type TExpertiseFilterProps = {
  groups: TExpertiseFilterGroup[];
  value: TExpertiseFilterValue;
  onApply: (value: TExpertiseFilterValue) => void;
  isAdmin?: boolean;
  onTagsUpdate?: (updatedGroups: TExpertiseFilterGroup[]) => void;
  getTagUsageCount?: (groupKey: string, tagValue: string) => number;
  getEmployeesByTag?: (
    groupKey: string,
    tagValue: string,
  ) => Array<{ name: string; position: string; photo?: string }>;
  getAllEmployees?: () => Array<{ id: string; name: string; position: string; photo?: string }>;
};

export const ExpertiseFilter = ({
  groups,
  value,
  onApply,
  isAdmin = true,
  onTagsUpdate,
  getTagUsageCount,
  getEmployeesByTag,
  getAllEmployees,
}: TExpertiseFilterProps) => {
  const [open, setOpen] = useState(false);
  const [draftValue, setDraftValue] = useState<TExpertiseFilterValue>(value);
  const [searchValue, setSearchValue] = useState("");
  const [currentGroups, setCurrentGroups] = useState<TExpertiseFilterGroup[]>(groups);

  const normalizedSearchValue = searchValue.trim().toLowerCase();

  const filteredGroups = normalizedSearchValue
    ? groups
        .map((group) => ({
          ...group,
          options: group.options.filter((option) =>
            option.label.toLowerCase().includes(normalizedSearchValue),
          ),
        }))
        .filter((group) => group.options.length > 0)
    : groups;

  const activeFilters = Object.entries(draftValue).flatMap(
    ([groupKey, selectedValues]) => {
      const group = groups.find((group) => group.key === groupKey);

      if (!group) {
        return [];
      }

      return selectedValues.flatMap((selectedValue) => {
        const option = group.options.find(
          (option) => option.value === selectedValue,
        );

        if (!option) {
          return [];
        }

        return [
          {
            groupKey,
            value: option.value,
            label: option.label,
          },
        ];
      });
    },
  );

  const selectedCount = Object.values(draftValue).reduce(
    (count, groupValue) => {
      return count + groupValue.length;
    },
    0,
  );

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setSearchValue("");
      setDraftValue(value);
    }
  };

  const handleRemoveFilter = (groupKey: string, optionValue: string) => {
    setDraftValue((prevState) => {
      const nextValue = { ...prevState };

      const nextGroupValue = (nextValue[groupKey] ?? []).filter(
        (value) => value !== optionValue,
      );

      if (nextGroupValue.length > 0) {
        nextValue[groupKey] = nextGroupValue;
      } else {
        delete nextValue[groupKey];
      }

      return nextValue;
    });
  };

  const handleResetFilters = () => {
    setDraftValue({});
  };

  const handleApplyFilters = () => {
    onApply(draftValue);
    setSearchValue("");
    setOpen(false);
  };

  const handleGroupChange = (groupKey: string, groupValue: string[]) => {
    setDraftValue((prevState) => {
      const nextValue = { ...prevState };

      if (groupValue.length > 0) {
        nextValue[groupKey] = groupValue;
      } else {
        delete nextValue[groupKey];
      }

      return nextValue;
    });
  };

  const handleTagsUpdate = (updatedGroups: TExpertiseFilterGroup[]) => {
    setCurrentGroups(updatedGroups);
    onTagsUpdate?.(updatedGroups);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <FilterTrigger
            selectedCount={selectedCount}
            label="С чем обратиться"
            open={open}
          />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-4 w-78 max-h-[min(var(--radix-popover-content-available-height),750px)]"
          sideOffset={10}
        >
          {isAdmin && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FilterIcon className="size-5" />
                <span className="body-m-semibold">Теги</span>
              </div>
              <TagsManager
                groups={currentGroups}
                onSave={handleTagsUpdate}
                trigger={
                  <Button variant="ghost" size="icon-sm" className="h-6 w-6">
                    <EditIcon className="size-4" />
                  </Button>
                }
                getTagUsageCount={getTagUsageCount}
                getEmployeesByTag={getEmployeesByTag}
                getAllEmployees={getAllEmployees}
              />
            </div>
          )}
          <SearchInput
            wrapperClassName="h-9 shrink-0"
            placeholder="Найти тег"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <div className="flex justify-between mt-2">
            <span className="body-m-semibold">{`Активные фильтры (${activeFilters.length})`}</span>
            <Button
              type="button"
              variant="link"
              size="xs"
              onClick={handleResetFilters}
            >
              Сбросить
            </Button>
          </div>

          <ul className="flex flex-wrap gap-1 mb-2.5">
            {activeFilters.map((filter) => (
              <li key={`${filter.groupKey}-${filter.value}`}>
                <FilterRemoveBadge
                  label={filter.label}
                  onRemove={() =>
                    handleRemoveFilter(filter.groupKey, filter.value)
                  }
                />
              </li>
            ))}
          </ul>

          {filteredGroups.length > 0 ? (
            <ul className="overflow-y-auto overflow-x-hidden">
              {filteredGroups.map((item) => (
                <li key={item.key}>
                  <CheckboxSelect
                    title={item.title}
                    options={item.options}
                    value={draftValue[item.key] ?? []}
                    onValueChange={(nextValue) =>
                      handleGroupChange(item.key, nextValue)
                    }
                    visibleCount={
                      normalizedSearchValue ? item.options.length : undefined
                    }
                    forceOpen={Boolean(normalizedSearchValue)}
                  />
                  <DropdownMenuSeparator className="my-4" />
                </li>
              ))}
            </ul>
          ) : (
            <div className="body-m text-(--color-gray-500) mb-5">
              Ничего не найдено
            </div>
          )}
          <div className="flex self-end gap-2">
            <Button onClick={handleApplyFilters} className="w-[118px] h-[32px] text-xs tracking-[-0.5px] bg-purple-500 hover:bg-purple-600 text-white rounded-[var(--radius-8)] disabled:opacity-50 disabled:cursor-not-allowed">Применить</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};