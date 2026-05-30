import { FilterTrigger } from "@/features/employee/ui/filter-trigger.tsx";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { CheckboxSelect } from "@ui/checkbox-select";
import { DropdownMenuSeparator } from "@ui/dropdown-menu";
import { SearchInput } from "@ui/input";
import { Button } from "@ui/button";
import { FilterRemoveBadge } from "@/features/employee/ui/filter-remove-badge.tsx";

type TExpertiseFilterOption = {
  value: string;
  label: string;
};

type TExpertiseFilterGroup = {
  key: string;
  title: string;
  options: TExpertiseFilterOption[];
};

type TExpertiseFilterValue = Record<string, string[]>;

const expertiseFilterGroups: TExpertiseFilterGroup[] = [
  {
    key: "expertise",
    title: "Навыки и компетенции",
    options: [
      { value: "volunteer-management", label: "Волонтёрский менеджмент" },
      { value: "fundraising", label: "Фандрайзинг" },
      { value: "grant-application", label: "Грантовая заявка" },
      { value: "methodical-development", label: "Методическая разработка" },
      { value: "expertise-additional-1", label: "Дополнительные данные-1" },
      { value: "expertise-additional-2", label: "Дополнительные данные-2" },
      { value: "expertise-additional-3", label: "Дополнительные данные-3" },
      { value: "expertise-additional-4", label: "Дополнительные данные-4" },
      { value: "expertise-additional-5", label: "Дополнительные данные-5" },
      { value: "expertise-additional-6", label: "Дополнительные данные-6" },
      { value: "expertise-additional-7", label: "Дополнительные данные-7" },
      { value: "expertise-additional-8", label: "Дополнительные данные-8" },
      { value: "expertise-additional-9", label: "Дополнительные данные-9" },
      { value: "expertise-additional-10", label: "Дополнительные данные-10" },
      { value: "expertise-additional-11", label: "Дополнительные данные-11" },
      { value: "expertise-additional-12", label: "Дополнительные данные-12" },
    ],
  },
  {
    key: "availability",
    title: "Статус и доступность",
    options: [
      { value: "active", label: "В работе" },
      { value: "vacation", label: "В отпуске" },
      { value: "sick", label: "На больничном" },
      { value: "maternity", label: "В декрете" },
      {
        value: "availability-additional-1",
        label: "Дополнительные данные-1",
      },
      {
        value: "availability-additional-2",
        label: "Дополнительные данные-2",
      },
      {
        value: "availability-additional-3",
        label: "Дополнительные данные-3",
      },
      {
        value: "availability-additional-4",
        label: "Дополнительные данные-4",
      },
      {
        value: "availability-additional-5",
        label: "Дополнительные данные-5",
      },
      {
        value: "availability-additional-6",
        label: "Дополнительные данные-6",
      },
      {
        value: "availability-additional-7",
        label: "Дополнительные данные-7",
      },
      {
        value: "availability-additional-8",
        label: "Дополнительные данные-8",
      },
      {
        value: "availability-additional-9",
        label: "Дополнительные данные-9",
      },
      {
        value: "availability-additional-10",
        label: "Дополнительные данные-10",
      },
      {
        value: "availability-additional-11",
        label: "Дополнительные данные-11",
      },
      {
        value: "availability-additional-12",
        label: "Дополнительные данные-12",
      },
    ],
  },
  {
    key: "experience",
    title: "Опыт",
    options: [
      { value: "hr-experience", label: "Опыт в HR" },
      { value: "research-experience", label: "Опыт в исследованиях" },
      { value: "coaching-experience", label: "Опыт в коучинге" },
      {
        value: "psychological-counseling-experience",
        label: "Опыт в психологическом консультировании",
      },
      { value: "experience-additional-1", label: "Дополнительные данные-1" },
      { value: "experience-additional-2", label: "Дополнительные данные-2" },
      { value: "experience-additional-3", label: "Дополнительные данные-3" },
      { value: "experience-additional-4", label: "Дополнительные данные-4" },
      { value: "experience-additional-5", label: "Дополнительные данные-5" },
      { value: "experience-additional-6", label: "Дополнительные данные-6" },
      { value: "experience-additional-7", label: "Дополнительные данные-7" },
      { value: "experience-additional-8", label: "Дополнительные данные-8" },
      { value: "experience-additional-9", label: "Дополнительные данные-9" },
      {
        value: "experience-additional-10",
        label: "Дополнительные данные-10",
      },
      {
        value: "experience-additional-11",
        label: "Дополнительные данные-11",
      },
      {
        value: "experience-additional-12",
        label: "Дополнительные данные-12",
      },
    ],
  },
];

export const ExpertiseFilter = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<TExpertiseFilterValue>({});
  const [searchValue, setSearchValue] = useState("");
  console.log(value);

  const normalizedSearchValue = searchValue.trim().toLowerCase();

  const filteredGroups = normalizedSearchValue
    ? expertiseFilterGroups
        .map((group) => ({
          ...group,
          options: group.options.filter((option) =>
            option.label.toLowerCase().includes(normalizedSearchValue),
          ),
        }))
        .filter((group) => group.options.length > 0)
    : expertiseFilterGroups;

  const activeFilters = Object.entries(value).flatMap(
    ([groupKey, selectedValues]) => {
      const group = expertiseFilterGroups.find(
        (group) => group.key === groupKey,
      );

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

  const handleRemoveFilter = (groupKey: string, optionValue: string) => {
    setValue((prevState) => {
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
    setValue({});
  };

  const handleGroupChange = (groupKey: string, groupValue: string[]) => {
    setValue((prevState) => ({
      ...prevState,
      [groupKey]: groupValue,
    }));
  };

  const selectedCount = Object.values(value).reduce((count, groupValue) => {
    return count + groupValue.length;
  }, 0);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FilterTrigger
            selectedCount={selectedCount}
            label="С чем обратиться"
            open={open}
          />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-6 w-98 max-h-[min(var(--radix-popover-content-available-height),750px)] overflow-y-auto"
          sideOffset={10}
        >
          <SearchInput
            wrapperClassName="h-11 shrink-0"
            placeholder="Поиск"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <div className="flex justify-between mt-4">
            <span className="body-m-semibold">{`Активные фильтры (${activeFilters.length})`}</span>
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
            <ul>
              {filteredGroups.map((item) => (
                <li key={item.key}>
                  <CheckboxSelect
                    title={item.title}
                    options={item.options}
                    value={value[item.key] ?? []}
                    onValueChange={(nextValue) =>
                      handleGroupChange(item.key, nextValue)
                    }
                    visibleCount={
                      normalizedSearchValue ? item.options.length : undefined
                    }
                    forceOpen={Boolean(normalizedSearchValue)}
                  />
                  <DropdownMenuSeparator className="mt-4" />
                </li>
              ))}
            </ul>
          ) : (
            <div>Ничего не найдено</div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
