import { useState, useMemo, useEffect } from "react";
import { cn } from "@/shared/lib";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg?react";
import CloseIcon from "@/shared/assets/icons/close.svg?react";
import { CompetenciesPopoverContent } from "./competencies-popover";
import { CompetenciesDialogContent } from "./competencies-dialog";
import { useCreateTag, useTags } from "@/entities/tags";
import { useNotificationStore } from "@/shared/model/stores";

interface CompetenciesSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

const VISIBLE_COUNT = 5;

export const CompetenciesSelect = ({
  value,
  onChange,
  error,
}: CompetenciesSelectProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tempValue, setTempValue] = useState<string[]>(value);
  const [showAll, setShowAll] = useState(false);
  const [fullDialogOpen, setFullDialogOpen] = useState(false);
  const [fullSearchQuery, setFullSearchQuery] = useState("");
  const [fullTempValue, setFullTempValue] = useState<string[]>(value);

  const [options, setOptions] = useState<Array<{ id: string; label: string }>>(
    [],
  );

  const addNotification = useNotificationStore((state) => state.add);
  const createTagMutation = useCreateTag();

  const { data: tagsData, refetch } = useTags({ limit: 100 });

  useEffect(() => {
    if (tagsData?.results) {
      const mappedOptions = tagsData.results.map((tag) => ({
        id: String(tag.id),
        label: tag.name,
      }));
      setOptions(mappedOptions);
    }
  }, [tagsData]);

  useEffect(() => {
    if (open) {
      setTempValue([...value]);
    }
  }, [open, value]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setTempValue([...value]);
      setSearchQuery("");
      setShowAll(false);
      refetch();
    }
  };

  const handleToggleCompetency = (competencyName: string) => {
    setTempValue((prev) =>
      prev.includes(competencyName)
        ? prev.filter((name) => name !== competencyName)
        : [...prev, competencyName],
    );
  };

  const handleFullToggleCompetency = (competencyName: string) => {
    setFullTempValue((prev) =>
      prev.includes(competencyName)
        ? prev.filter((name) => name !== competencyName)
        : [...prev, competencyName],
    );
  };

  const handleClear = () => {
    setTempValue([]);
  };

  const handleFullClear = () => {
    setFullTempValue([]);
  };

  const handleApply = () => {
    onChange(tempValue);
    setOpen(false);
  };

  const handleFullApply = () => {
    onChange(fullTempValue);
    setFullDialogOpen(false);
  };

  const handleRemoveCompetency = (name: string) => {
    const newValue = value.filter((v) => v !== name);
    onChange(newValue);
  };

  const handleOpenFullDialog = () => {
    setFullTempValue([...tempValue]);
    setFullSearchQuery("");
    setFullDialogOpen(true);
  };

  const handleAddTag = (tagName: string) => {
    const trimmedName = tagName.trim();
    if (!trimmedName) {
      addNotification({
        type: "error",
        title: "Ошибка",
        message: "Название тега не может быть пустым",
      });
      return;
    }

    const existingTag = options.find(
      (opt) => opt.label.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (existingTag) {
      addNotification({
        type: "warning",
        title: "Тег уже существует",
        message: `Тег «${trimmedName}» уже существует.`,
      });
      if (!tempValue.includes(existingTag.label)) {
        setTempValue((prev) => [...prev, existingTag.label]);
      }
      return;
    }

    createTagMutation.mutate(
      { name: trimmedName },
      {
        onSuccess: (newTag) => {
          addNotification({
            type: "success",
            iconType: "success",
            title: "Успешно",
            message: `Тег «${trimmedName}» создан`,
          });

          const newTagName = newTag.name;

          setOptions((prev) => [
            ...prev,
            { id: String(newTag.id), label: newTagName },
          ]);
          setTempValue((prev) => [...prev, newTagName]);

          if (fullDialogOpen) {
            setFullTempValue((prev) => [...prev, newTagName]);
          }

          onChange([...value, newTagName]);
          setSearchQuery("");
          setFullSearchQuery("");
          refetch();
        },
        onError: () => {
          addNotification({
            type: "error",
            title: "Ошибка",
            message: "Не удалось создать тег. Попробуйте позже.",
          });
        },
      },
    );
  };

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const query = searchQuery.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [searchQuery, options]);

  const fullFilteredOptions = useMemo(() => {
    if (!fullSearchQuery.trim()) return options;
    const query = fullSearchQuery.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [fullSearchQuery, options]);

  const displayedOptions = showAll
    ? filteredOptions
    : filteredOptions.slice(0, VISIBLE_COUNT);
  const hasMore = filteredOptions.length > VISIBLE_COUNT;

  const selectedLabels = value;

  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start font-normal h-[44px] mt-1 hover:bg-transparent",
              error && "border-red-600",
              !error && "border-gray-200",
            )}
          >
            <div className="flex flex-nowrap items-center gap-1 flex-1 min-w-0 overflow-hidden">
              {selectedLabels.length > 0 ? (
                selectedLabels.map((label) => {
                  return (
                    <Badge
                      key={label}
                      className="gap-1 bg-purple-50 text-purple-500 text-overline py-0.5 px-2 shrink-0"
                    >
                      {label}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveCompetency(label);
                        }}
                        className="ml-1 rounded-full p-0.5 transition-all cursor-pointer hover:bg-purple-100 inline-flex items-center justify-center"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleRemoveCompetency(label);
                          }
                        }}
                      >
                        <CloseIcon className="size-2.5 text-purple-500 hover:text-purple-700" />
                      </span>
                    </Badge>
                  );
                })
              ) : (
                <span className="text-gray-400 text-sm">
                  Выберите компетенции
                </span>
              )}
            </div>
            <ArrowDownIcon className="size-4 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[368px] p-4 rounded-6 border border-gray-200 shadow-md"
          align="start"
          sideOffset={8}
        >
          <CompetenciesPopoverContent
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            tempValue={tempValue}
            onToggleCompetency={handleToggleCompetency}
            displayedOptions={displayedOptions}
            onClear={handleClear}
            onApply={handleApply}
            onShowAll={handleOpenFullDialog}
            hasMore={hasMore}
            showAll={showAll}
            filteredCount={filteredOptions.length}
            onAddTag={handleAddTag}
          />
        </PopoverContent>
      </Popover>

      <CompetenciesDialogContent
        open={fullDialogOpen}
        onOpenChange={setFullDialogOpen}
        searchQuery={fullSearchQuery}
        onSearchChange={setFullSearchQuery}
        tempValue={fullTempValue}
        onToggleCompetency={handleFullToggleCompetency}
        filteredOptions={fullFilteredOptions}
        onClear={handleFullClear}
        onApply={handleFullApply}
        onAddTag={handleAddTag}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};
