import { useState } from "react";
import { Button } from "@ui/button";
import { FilterTrigger } from "@/features/employee/ui/filter-trigger";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { CheckboxSelect } from "@ui/checkbox-select";
import { SearchInput } from "@ui/input";
import { FilterRemoveBadge } from "@/features/employee/ui/filter-remove-badge";
import { TagsManager } from "./tags-manager";
import { useTags } from "@/entities/tags";
import type { TExpertiseFilterGroup } from "@/features/employee/model/types";
import FilterIcon from "@icons/filter.svg?react";
import EditIcon from "@icons/edit.svg?react";

const EXPERTISE_GROUP_TITLE = "Навыки и компетенции";

type TExpertiseFilterProps = {
  /** Выбранные ID тегов (строками) */
  value: string[];
  onApply: (value: string[]) => void;
  isAdmin?: boolean;
  getTagUsageCount?: (tagId: number) => number;
  getEmployeesByTag?: (
    tagId: number,
  ) => Array<{ id: string; name: string; position: string; photo?: string }>;
  getAllEmployees?: () => Array<{
    id: string;
    name: string;
    position: string;
    photo?: string;
  }>;
};

export const ExpertiseFilter = ({
  value,
  onApply,
  isAdmin = true,
  getTagUsageCount,
  getEmployeesByTag,
  getAllEmployees,
}: TExpertiseFilterProps) => {
  const [open, setOpen] = useState(false);
  const [draftValue, setDraftValue] = useState<string[]>(value);
  const [searchValue, setSearchValue] = useState("");

  const { data: tagsData } = useTags({ limit: 100 });

  const options = (tagsData?.results ?? []).map((tag) => ({
    value: String(tag.id),
    label: tag.name,
  }));

  // TagsManager работает со структурой групп, поэтому отдаём ему
  // единственную группу со всеми тегами
  const managerGroups: TExpertiseFilterGroup[] = [
    { key: "expertise", title: EXPERTISE_GROUP_TITLE, options },
  ];

  const normalizedSearchValue = searchValue.trim().toLowerCase();

  const filteredOptions = normalizedSearchValue
    ? options.filter((option) =>
        option.label.toLowerCase().includes(normalizedSearchValue),
      )
    : options;

  const activeFilters = options.filter((option) =>
    draftValue.includes(option.value),
  );

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSearchValue("");
      setDraftValue(value);
    }
  };

  const handleRemoveFilter = (optionValue: string) => {
    setDraftValue((prevState) =>
      prevState.filter((item) => item !== optionValue),
    );
  };

  const handleResetFilters = () => {
    setDraftValue([]);
  };

  const handleApplyFilters = () => {
    onApply(draftValue);
    setSearchValue("");
    setOpen(false);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <FilterTrigger
            selectedCount={draftValue.length}
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
                groups={managerGroups}
                onSave={() => {}}
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
              <li key={filter.value}>
                <FilterRemoveBadge
                  label={filter.label}
                  onRemove={() => handleRemoveFilter(filter.value)}
                />
              </li>
            ))}
          </ul>

          <div className="overflow-y-auto overflow-x-hidden">
            {filteredOptions.length > 0 ? (
              <CheckboxSelect
                title={EXPERTISE_GROUP_TITLE}
                options={filteredOptions}
                value={draftValue}
                onValueChange={setDraftValue}
                visibleCount={
                  normalizedSearchValue ? filteredOptions.length : undefined
                }
                forceOpen={Boolean(normalizedSearchValue)}
              />
            ) : (
              <div className="body-m text-(--color-gray-500) mb-5">
                Ничего не найдено
              </div>
            )}
          </div>

          <div className="flex self-end gap-2">
            <Button
              onClick={handleApplyFilters}
              className="w-[118px] h-[32px] text-xs tracking-[-0.5px] bg-purple-500 hover:bg-purple-600 text-white rounded-[var(--radius-8)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Применить
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
