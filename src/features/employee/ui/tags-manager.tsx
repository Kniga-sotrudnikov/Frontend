import { useState } from "react";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@ui/dialog";
import { Input } from "@ui/input";
import { useNotificationStore } from "@/shared/model/stores";
import PlusIcon from "@icons/plus.svg?react";
import TrashIcon from "@icons/trash.svg?react";
import EyevisibleIcon from "@icons/eye-visible.svg?react";
import EditIcon from "@icons/edit.svg?react";
import GridIcon from "@icons/grid.svg?react";
import { AddTagDialog } from "./add-tag-dialog";
import { EmployeesListDialog } from "./employees-list-dialog";
import type {
  TExpertiseFilterGroup,
  TExpertiseFilterOption,
} from "../model/types";

type TagsManagerProps = {
  groups: TExpertiseFilterGroup[];
  onSave: (updatedGroups: TExpertiseFilterGroup[]) => void;
  trigger: React.ReactNode;
  getTagUsageCount?: (groupKey: string, tagValue: string) => number;
  getEmployeesByTag?: (
    groupKey: string,
    tagValue: string,
  ) => Array<{ name: string; position: string; photo?: string }>;
  getAllEmployees?: () => Array<{ id: string; name: string; position: string; photo?: string }>;
};

type EditingTag = {
  groupKey: string;
  optionValue: string;
  newLabel: string;
};

type Employee = {
  id: string;
  name: string;
  position: string;
  photo?: string;
};

const labelToValue = (label: string): string => {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-zа-яё0-9\s]/g, "")
    .replace(/\s+/g, "-");
};

const getDeclension = (
  count: number,
  one: string,
  few: string,
  many: string,
): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
};

export const TagsManager = ({
  groups,
  onSave,
  trigger,
  getTagUsageCount,
  getEmployeesByTag,
  getAllEmployees,
}: TagsManagerProps) => {
  const [open, setOpen] = useState(false);
  const [localGroups, setLocalGroups] =
    useState<TExpertiseFilterGroup[]>(groups);
  const [editingTag, setEditingTag] = useState<EditingTag | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [selectedGroupForNewTag, setSelectedGroupForNewTag] =
    useState<string>("");
  const [selectedTagForEmployees, setSelectedTagForEmployees] = useState<{
    groupKey: string;
    tagValue: string;
    label: string;
  } | null>(null);
  
  // Состояния для выбора сотрудников при создании тега
  const [employeesListForTag, setEmployeesListForTag] = useState<Employee[]>([]);
  const [selectedEmployeesForTag, setSelectedEmployeesForTag] = useState<string[]>([]);
  
  const addNotification = useNotificationStore((state) => state.add);

  const handleSave = () => {
    onSave(localGroups);
    addNotification({
      type: "success",
      iconType: "success",
      title: "Успешно",
      message: "Теги успешно обновлены",
    });
    setOpen(false);
  };

  const handleCancel = () => {
    setLocalGroups(groups);
    setOpen(false);
  };

  const addTag = (groupKey: string, newLabel: string) => {
    const trimmedLabel = newLabel.trim();
    if (!trimmedLabel) return;

    const newValue = labelToValue(trimmedLabel);

    const group = localGroups.find((g) => g.key === groupKey);
    const exists = group?.options.some((opt) => opt.value === newValue);

    if (exists) {
      addNotification({
        type: "error",
        title: "Ошибка",
        message: "Тег с таким названием уже существует",
      });
      return;
    }

    const newOption: TExpertiseFilterOption = {
      value: newValue,
      label: trimmedLabel,
    };

    setLocalGroups((prev) =>
      prev.map((group) =>
        group.key === groupKey
          ? { ...group, options: [...group.options, newOption] }
          : group,
      ),
    );
    setNewTagName("");
    setSelectedGroupForNewTag("");
    setIsAddDialogOpen(false);
  };

  const deleteTag = (groupKey: string, optionValue: string) => {
    const usageCount = getTagUsageCount?.(groupKey, optionValue) ?? 0;
    if (usageCount > 0) {
      addNotification({
        type: "error",
        title: "Нельзя удалить",
        message: `Тег используется у ${usageCount} ${getDeclension(usageCount, "сотрудника", "сотрудников", "сотрудников")}. Сначала удалите его у всех сотрудников.`,
      });
      return;
    }

    setLocalGroups((prev) =>
      prev.map((group) =>
        group.key === groupKey
          ? {
              ...group,
              options: group.options.filter((opt) => opt.value !== optionValue),
            }
          : group,
      ),
    );
  };

  const startEditTag = (groupKey: string, option: TExpertiseFilterOption) => {
    setEditingTag({
      groupKey,
      optionValue: option.value,
      newLabel: option.label,
    });
  };

  const saveEditTag = () => {
    if (!editingTag) return;

    const newLabel = editingTag.newLabel.trim();
    if (!newLabel) {
      setEditingTag(null);
      return;
    }

    const newValue = labelToValue(newLabel);
    const group = localGroups.find((g) => g.key === editingTag.groupKey);

    const exists = group?.options.some(
      (opt) => opt.value === newValue && opt.value !== editingTag.optionValue,
    );

    if (exists) {
      addNotification({
        type: "error",
        title: "Ошибка",
        message: "Тег с таким названием уже существует",
      });
      setEditingTag(null);
      return;
    }

    setLocalGroups((prev) =>
      prev.map((group) =>
        group.key === editingTag.groupKey
          ? {
              ...group,
              options: group.options.map((opt) =>
                opt.value === editingTag.optionValue
                  ? { ...opt, label: newLabel, value: newValue }
                  : opt,
              ),
            }
          : group,
      ),
    );
    setEditingTag(null);
  };

  const handleAddTagClick = () => {
    // Загружаем список сотрудников при открытии диалога
    if (getAllEmployees) {
      setEmployeesListForTag(getAllEmployees());
    }
    setSelectedEmployeesForTag([]);
    setIsAddDialogOpen(true);
    if (localGroups.length > 0 && !selectedGroupForNewTag) {
      setSelectedGroupForNewTag(localGroups[0].key);
    }
  };

  const handleShowEmployees = (
    groupKey: string,
    tagValue: string,
    label: string,
  ) => {
    setSelectedTagForEmployees({ groupKey, tagValue, label });
  };

  const handleAddTag = () => {
    addTag(selectedGroupForNewTag, newTagName);
    // TODO: Здесь также нужно добавить тег выбранным сотрудникам
    // selectedEmployeesForTag.forEach(employeeId => {
    //   addTagToEmployee(employeeId, newTagName);
    // });
  };

  const handleEmployeeToggle = (employeeId: string) => {
    setSelectedEmployeesForTag((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleClearEmployees = () => {
    setSelectedEmployeesForTag([]);
  };

  const employeesList = selectedTagForEmployees
    ? getEmployeesByTag?.(
        selectedTagForEmployees.groupKey,
        selectedTagForEmployees.tagValue,
      ) ?? []
    : [];

  const employeesCount = selectedTagForEmployees
    ? getTagUsageCount?.(
        selectedTagForEmployees.groupKey,
        selectedTagForEmployees.tagValue,
      ) ?? 0
    : 0;

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!w-[752px] !h-[912px] !max-w-none !p-0 !rounded-8 !border !border-gray-200 !bg-white">
          <div className="flex justify-between items-center px-5 pt-5 pb-0 flex-shrink-0">
            <DialogHeader className="!p-0">
              <DialogTitle className="text-[16px] font-semibold text-gray-900 leading-[22px]">
                Редактировать теги сотрудников
              </DialogTitle>
            </DialogHeader>
            <DialogClose variant="icon" />
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {localGroups.map((group) => (
              <div key={group.key} className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-[16px] font-semibold leading-6 tracking-[0.15px] text-[#2C2A29]">
                    {group.title} ({group.options.length})
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  {group.options.map((option) => {
                    const usageCount =
                      getTagUsageCount?.(group.key, option.value) ?? 0;
                    const isEditing =
                      editingTag?.optionValue === option.value &&
                      editingTag?.groupKey === group.key;

                    return (
                      <div
                        key={option.value}
                        className={`bg-white border border-[#DFDDDD] rounded-[8px] ${
                          isEditing
                            ? "p-[10px_12px]"
                            : "p-[10px_12px] min-h-[12px]"
                        }`}
                      >
                        {isEditing ? (
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-4">
                              <Input
                                value={editingTag.newLabel}
                                onChange={(e) =>
                                  setEditingTag({
                                    ...editingTag,
                                    newLabel: e.target.value,
                                  })
                                }
                                className="h-9 text-sm flex-1 max-w-[300px]"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") saveEditTag();
                                  if (e.key === "Escape") setEditingTag(null);
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-2 ml-9">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={saveEditTag}
                                className="h-8 px-3 text-sm"
                              >
                                Сохранить
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingTag(null)}
                                className="h-8 px-3 text-sm"
                              >
                                Отмена
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="w-5 h-5 relative">
                                <GridIcon className="size-5" />
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[16px] font-medium leading-5 tracking-[0.1px] text-[#2C2A29]">
                                  {option.label}
                                </span>
                                {usageCount > 0 && (
                                  <span className="text-[14px] font-normal leading-5 tracking-[0.1px] text-[#2C2A29]">
                                    Используется у {usageCount}{" "}
                                    {getDeclension(
                                      usageCount,
                                      "сотрудника",
                                      "сотрудников",
                                      "сотрудников",
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-5 px-2">
                              <button
                                className="w-5 h-5 text-[#7A7A7A] hover:text-purple-500 transition-colors"
                                onClick={() => startEditTag(group.key, option)}
                              >
                                <EditIcon className="size-4" />
                              </button>
                              <button
                                className="w-5 h-5 text-[#7A7A7A] hover:text-purple-500 transition-colors"
                                onClick={() =>
                                  handleShowEmployees(
                                    group.key,
                                    option.value,
                                    option.label,
                                  )
                                }
                              >
                                <EyevisibleIcon className="size-4" />
                              </button>
                              <button
                                className="w-5 h-5 text-[#FF383C] hover:text-red-700 transition-colors"
                                onClick={() =>
                                  deleteTag(group.key, option.value)
                                }
                              >
                                <TrashIcon className="size-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center px-5 pb-6 pt-0 flex-shrink-0 w-full">
            <Button
              variant="ghost"
              size="xs"
              className="text-purple-500 mb-1"
              onClick={handleAddTagClick}
            >
              <PlusIcon className="size-2 mr-1" />
              Добавить тег
            </Button>
            <div className="flex gap-4">
              <Button
                type="button"
                variant="plain"
                onClick={handleCancel}
                className="w-[89px] h-[32px] border-purple-500 bg-white text-xs tracking-[-1.5px] text-purple-500 hover:bg-purple-50 rounded-[var(--radius-8)]"
              >
                Отмена
              </Button>
              <Button
                onClick={handleSave}
                className="w-[81px] h-[33px] text-xs tracking-[-0.5px] items-center bg-purple-500 hover:bg-purple-600 text-white rounded-[var(--radius-8)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Готово
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddTagDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        groups={localGroups}
        selectedGroup={selectedGroupForNewTag}
        onGroupChange={setSelectedGroupForNewTag}
        tagName={newTagName}
        onTagNameChange={setNewTagName}
        employees={employeesListForTag}
        selectedEmployees={selectedEmployeesForTag}
        onEmployeeToggle={handleEmployeeToggle}
        onClearEmployees={handleClearEmployees}
        onAdd={handleAddTag}
        onSave={handleAddTag}
      />

      <EmployeesListDialog
        open={!!selectedTagForEmployees}
        onOpenChange={() => setSelectedTagForEmployees(null)}
        title={selectedTagForEmployees?.label ?? ""}
        employees={employeesList}
        totalCount={employeesCount}
      />
    </>
  );
};