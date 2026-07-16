import { useState, useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@ui/dialog";
import { useNotificationStore } from "@/shared/model/stores";
import {
  useTags,
  useDeleteTag,
  useUpdateTag,
  useCreateTag,
  useBulkAddTags,
  useBulkRemoveTags,
  tagsKeys,
} from "@/entities/tags";
import PlusIcon from "@icons/plus.svg?react";
import TrashIcon from "@icons/trash.svg?react";
import EyevisibleIcon from "@icons/eye-visible.svg?react";
import EditIcon from "@icons/edit.svg?react";
import GridIcon from "@icons/grid.svg?react";
import { AddTagDialog } from "./add-tag-dialog";
import { AddEmployeesToTagDialog } from "./add-employees-to-tag-dialog";
import { EmployeesListDialog } from "./employees-list-dialog";
import type { TExpertiseFilterGroup } from "../model/types";
import { FormSelect } from "@/features/create-employee/ui/form-select";
import { FormInput } from "@/features/create-employee/ui/form-input";
import { usePreventDialogClose } from "@/shared/lib/hooks/use-prevent-dialog-close";

type TagsManagerProps = {
  groups: TExpertiseFilterGroup[];
  onSave: (updatedGroups: TExpertiseFilterGroup[]) => void;
  trigger: React.ReactNode;
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
  onTagsUpdate?: (updatedGroups: TExpertiseFilterGroup[]) => void;
};

type EditingTag = {
  id: number;
  name: string;
  newName: string;
};

type Employee = {
  id: string;
  name: string;
  position: string;
  photo?: string;
};

export const TagsManager = ({
  groups,
  onSave,
  trigger,
  getTagUsageCount,
  getEmployeesByTag,
  getAllEmployees,
  onTagsUpdate,
}: TagsManagerProps) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<EditingTag | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [selectedGroupForNewTag, setSelectedGroupForNewTag] =
    useState<string>("");
  const [selectedTagForEmployees, setSelectedTagForEmployees] = useState<{
    tagId: number;
    tagName: string;
  } | null>(null);

  const [employeesListForTag, setEmployeesListForTag] = useState<Employee[]>(
    [],
  );
  const [selectedEmployeesForTag, setSelectedEmployeesForTag] = useState<
    string[]
  >([]);

  const [addEmployeesDialog, setAddEmployeesDialog] = useState<{
    open: boolean;
    tagId: number;
    tagName: string;
  }>({
    open: false,
    tagId: 0,
    tagName: "",
  });

  const addNotification = useNotificationStore((state) => state.add);

  const { data: tagsData, isLoading } = useTags({ limit: 100 });

  const tags = useMemo(() => tagsData?.results || [], [tagsData]);

  const deleteTagMutation = useDeleteTag();
  const updateTagMutation = useUpdateTag();
  const createTagMutation = useCreateTag();
  const bulkAddTagsMutation = useBulkAddTags();
  const bulkRemoveTagsMutation = useBulkRemoveTags();

  const invalidateTags = () => {
    queryClient.invalidateQueries({ queryKey: tagsKeys.lists() });
    queryClient.invalidateQueries({ queryKey: ["employees-list"] });
    queryClient.invalidateQueries({ queryKey: ["employees-raw"] });
  };

  useEffect(() => {
    if (tags.length > 0 && groups.length > 0) {
      const updatedGroups = groups.map((group) => {
        const groupTags = tags.map((tag) => ({
          value: String(tag.id),
          label: tag.name,
        }));

        return {
          ...group,
          options: groupTags,
        };
      });

      onTagsUpdate?.(updatedGroups);
    }
  }, [tags, groups, onTagsUpdate]);

  const handleSave = () => {
    onSave(groups);
    addNotification({
      type: "success",
      iconType: "success",
      title: "Успешно",
      message: "Теги успешно обновлены",
    });
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const deleteTag = (tagId: number) => {
    const usageCount = getTagUsageCount?.(tagId) ?? 0;
    if (usageCount > 0) {
      addNotification({
        type: "error",
        title: "Нельзя удалить",
        message: `Тег используется у ${usageCount} сотрудников. Сначала удалите его у всех сотрудников.`,
      });
      return;
    }

    deleteTagMutation.mutate(tagId, {
      onSuccess: () => {
        addNotification({
          type: "success",
          iconType: "success",
          title: "Успешно",
          message: "Тег удален",
        });
        invalidateTags();
      },
      onError: (error) => {
        addNotification({
          type: "error",
          title: "Ошибка",
          message: "Не удалось удалить тег",
        });
        console.error("Error deleting tag:", error);
      },
    });
  };

  const startEditTag = (tag: { id: number; name: string }) => {
    setEditingTag({
      id: tag.id,
      name: tag.name,
      newName: tag.name,
    });
  };

  const saveEditTag = () => {
    if (!editingTag) return;

    const newName = editingTag.newName.trim();
    if (!newName) {
      setEditingTag(null);
      return;
    }

    if (newName === editingTag.name) {
      setEditingTag(null);
      return;
    }

    updateTagMutation.mutate(
      { id: editingTag.id, data: { name: newName } },
      {
        onSuccess: () => {
          addNotification({
            type: "success",
            iconType: "success",
            title: "Успешно",
            message: `Тег обновлен`,
          });
          setEditingTag(null);
          invalidateTags();
        },
        onError: (error) => {
          addNotification({
            type: "error",
            title: "Ошибка",
            message: "Не удалось обновить тег",
          });
          console.error("Error updating tag:", error);
        },
      },
    );
  };

  const handleAddTagClick = () => {
    if (getAllEmployees) {
      const employeesList = getAllEmployees();
      setEmployeesListForTag(employeesList || []);
    } else {
      setEmployeesListForTag([]);
    }
    setSelectedEmployeesForTag([]);
    setNewTagName("");
    setIsAddDialogOpen(true);
    if (groups.length > 0 && !selectedGroupForNewTag) {
      setSelectedGroupForNewTag(groups[0].key);
    }
  };

  const handleShowEmployees = (tagId: number, tagName: string) => {
    setSelectedTagForEmployees({ tagId, tagName });
  };

  const getTagEmployeeCount = (tagId: number): number => {
    return getTagUsageCount?.(tagId) ?? 0;
  };

  const getTagEmployees = (tagId: number) => {
    return getEmployeesByTag?.(tagId) ?? [];
  };

  const handleAddTag = () => {
    if (selectedGroupForNewTag && newTagName.trim()) {
      const trimmedName = newTagName.trim();

      createTagMutation.mutate(
        { name: trimmedName },
        {
          onSuccess: (newTag) => {
            addNotification({
              type: "success",
              iconType: "success",
              title: "Успешно",
              message: `Тег «${trimmedName}» добавлен`,
            });

            if (selectedEmployeesForTag.length > 0) {
              bulkAddTagsMutation.mutate(
                {
                  employee_ids: selectedEmployeesForTag.map((id) => Number(id)),
                  tag_ids: [newTag.id],
                },
                {
                  onSuccess: () => {
                    addNotification({
                      type: "success",
                      iconType: "success",
                      title: "Успешно",
                      message: `${selectedEmployeesForTag.length} сотрудников добавлены к тегу`,
                    });
                    invalidateTags();
                    setIsAddDialogOpen(false);
                    setNewTagName("");
                    setSelectedEmployeesForTag([]);
                  },
                  onError: (error) => {
                    addNotification({
                      type: "error",
                      title: "Ошибка",
                      message: "Не удалось добавить сотрудников к тегу",
                    });
                    console.error("Error adding employees to new tag:", error);
                  },
                },
              );
            } else {
              invalidateTags();
              setIsAddDialogOpen(false);
              setNewTagName("");
              setSelectedEmployeesForTag([]);
            }
          },
          onError: (error) => {
            addNotification({
              type: "error",
              title: "Ошибка",
              message: "Не удалось создать тег",
            });
            console.error("Error creating tag:", error);
          },
        },
      );
    }
  };

  const handleSaveDialog = () => {
    setIsAddDialogOpen(false);
    addNotification({
      type: "success",
      iconType: "success",
      title: "Успешно",
      message: "Тег успешно сохранён",
    });
  };

  const handleEmployeeToggle = (employeeId: string) => {
    setSelectedEmployeesForTag((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId],
    );
  };

  const handleClearEmployees = () => {
    setSelectedEmployeesForTag([]);
  };

  const handleOpenAddEmployees = (tagId: number, tagName: string) => {
    if (getAllEmployees) {
      const employeesList = getAllEmployees();
      setEmployeesListForTag(employeesList || []);
    } else {
      setEmployeesListForTag([]);
    }
    setSelectedEmployeesForTag([]);
    setAddEmployeesDialog({
      open: true,
      tagId,
      tagName,
    });
  };

  const handleAddEmployeesToTag = () => {
    if (selectedEmployeesForTag.length === 0) {
      addNotification({
        type: "error",
        title: "Ошибка",
        message: "Выберите хотя бы одного сотрудника",
      });
      return;
    }

    bulkAddTagsMutation.mutate(
      {
        employee_ids: selectedEmployeesForTag.map((id) => Number(id)),
        tag_ids: [addEmployeesDialog.tagId],
      },
      {
        onSuccess: () => {
          addNotification({
            type: "success",
            iconType: "success",
            title: "Успешно",
            message: `Сотрудники добавлены к тегу «${addEmployeesDialog.tagName}»`,
          });
          setAddEmployeesDialog({
            open: false,
            tagId: 0,
            tagName: "",
          });
          setSelectedEmployeesForTag([]);
          invalidateTags();
        },
        onError: (error) => {
          addNotification({
            type: "error",
            title: "Ошибка",
            message: "Не удалось добавить сотрудников к тегу",
          });
          console.error("Error adding employees to tag:", error);
        },
      },
    );
  };

  const handleRemoveEmployeeFromTag = (
    employeeId: string,
    employeeName: string,
  ) => {
    if (!editingTag) return;

    bulkRemoveTagsMutation.mutate(
      {
        employee_ids: [Number(employeeId)],
        tag_ids: [editingTag.id],
      },
      {
        onSuccess: () => {
          addNotification({
            type: "success",
            iconType: "success",
            title: "Успешно",
            message: `Сотрудник «${employeeName}» удалён из тега`,
          });
          invalidateTags();
        },
        onError: (error) => {
          addNotification({
            type: "error",
            title: "Ошибка",
            message: "Не удалось удалить сотрудника из тега",
          });
          console.error("Error removing employee from tag:", error);
        },
      },
    );
  };

  const preventDialogClose = usePreventDialogClose();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="!w-[752px] !h-[912px] !max-w-none !p-0 !rounded-8 !border !border-gray-200 !bg-white"
          onInteractOutside={preventDialogClose}
        >
          <div className="flex justify-between items-center px-5 pt-5 pb-0 flex-shrink-0">
            <DialogHeader className="!p-0">
              <DialogTitle className="text-[16px] font-semibold text-gray-900 leading-[22px]">
                Редактировать теги сотрудников
              </DialogTitle>
            </DialogHeader>
            <DialogClose variant="icon" />
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6">
            {groups.map((group) => (
              <div key={group.key} className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-[16px] font-semibold leading-6 tracking-[0.15px] text-[#2C2A29]">
                    {group.title} ({tags.length})
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  {tags.map((tag) => {
                    const usageCount = getTagEmployeeCount(tag.id);
                    const isEditing = editingTag?.id === tag.id;

                    return (
                      <div
                        key={tag.id}
                        className={`bg-white border border-[#DFDDDD] rounded-[8px] ${
                          isEditing
                            ? "p-[10px_12px]"
                            : "p-[10px_12px] min-h-[12px]"
                        }`}
                      >
                        {isEditing ? (
                          <div className="flex flex-col gap-2 mt-1">
                            <div className="flex gap-3">
                              <div className="flex-1">
                                <label className="block text-[14px] font-normal leading-5 tracking-[0.1px] text-[#141615] mb-2">
                                  Категория
                                </label>
                                <FormSelect
                                  value={editingTag.id.toString()}
                                  onValueChange={() => {}}
                                  options={groups.map((g) => ({
                                    value: g.key,
                                    label: g.title,
                                  }))}
                                  placeholder="Выберите категорию"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="block text-[14px] font-normal leading-5 tracking-[0.1px] text-[#141615] mb-2">
                                  Название
                                </label>
                                <FormInput
                                  placeholder="Например, Опыт в коучинге"
                                  value={editingTag.newName}
                                  onChange={(e) =>
                                    setEditingTag({
                                      ...editingTag,
                                      newName: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-[14px] font-normal text-[#141615]">
                                Сотрудники: {usageCount}
                              </span>
                              <Button
                                variant="ghost"
                                size="xs"
                                className="text-purple-500 mb-1 ml-1"
                                onClick={() =>
                                  handleOpenAddEmployees(
                                    editingTag.id,
                                    editingTag.newName,
                                  )
                                }
                              >
                                <PlusIcon className="size-2 mr-1" />
                                Добавить сотрудников
                              </Button>
                            </div>

                            <div className="flex flex-row flex-wrap gap-2 mt-1">
                              {getTagEmployees(editingTag.id)
                                ?.slice(0, 3)
                                .map((emp, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center w-fit h-[44px] p-1 bg-[#F6F6F6] rounded"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden">
                                        {emp.photo ? (
                                          <img
                                            src={emp.photo}
                                            alt={emp.name}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <div className="w-7 h-7 flex items-center justify-center text-gray-500 text-xs">
                                            Нет фото
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <div className="text-[12px] font-normal text-[#2C2A29]">
                                          {emp.name}
                                        </div>
                                        <div className="text-[12px] font-normal text-[#7B7979]">
                                          {emp.position}
                                        </div>
                                      </div>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      className="text-[#FF383C] hover:text-red-700"
                                      onClick={() => {
                                        handleRemoveEmployeeFromTag(
                                          emp.id,
                                          emp.name,
                                        );
                                      }}
                                    >
                                      <TrashIcon className="size-4" />
                                    </Button>
                                  </div>
                                ))}
                            </div>

                            {usageCount > 0 && (
                              <button
                                className="text-xs text-gray-500 tracking-[-0.5px] hover:text-gray-700 text-left w-fit"
                                onClick={() =>
                                  handleShowEmployees(
                                    editingTag.id,
                                    editingTag.newName,
                                  )
                                }
                              >
                                Показать всех ({usageCount})
                              </button>
                            )}

                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() => setEditingTag(null)}
                                className="w-[105px] h-[32px] text-xs font-medium border-purple-500 text-purple-500 hover:bg-purple-50 leading-5 tracking-[-0.75px]"
                              >
                                Отменить
                              </Button>
                              <Button
                                onClick={saveEditTag}
                                disabled={updateTagMutation.isPending}
                                className="w-[111px] h-[33px] text-xs font-medium bg-purple-500 hover:bg-purple-600 text-white leading-5 tracking-[-0.75px] disabled:opacity-50"
                              >
                                {updateTagMutation.isPending
                                  ? "Сохранение..."
                                  : "Сохранить"}
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
                                  {tag.name}
                                </span>
                                {usageCount > 0 && (
                                  <span className="text-[14px] font-normal leading-5 tracking-[0.1px] text-[#2C2A29]">
                                    Используется у {usageCount} сотрудников
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-5 px-2">
                              <button
                                className="w-5 h-5 text-[#7A7A7A] hover:text-purple-500 transition-colors"
                                onClick={() => startEditTag(tag)}
                              >
                                <EditIcon className="size-4" />
                              </button>
                              <button
                                className="w-5 h-5 text-[#7A7A7A] hover:text-purple-500 transition-colors"
                                onClick={() =>
                                  handleShowEmployees(tag.id, tag.name)
                                }
                              >
                                <EyevisibleIcon className="size-4" />
                              </button>
                              <button
                                className="w-5 h-5 text-[#FF383C] hover:text-red-700 transition-colors"
                                onClick={() => deleteTag(tag.id)}
                                disabled={deleteTagMutation.isPending}
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
        groups={groups}
        selectedGroup={selectedGroupForNewTag}
        onGroupChange={setSelectedGroupForNewTag}
        tagName={newTagName}
        onTagNameChange={setNewTagName}
        employees={employeesListForTag}
        selectedEmployees={selectedEmployeesForTag}
        onEmployeeToggle={handleEmployeeToggle}
        onClearEmployees={handleClearEmployees}
        onAdd={handleAddTag}
        onSave={handleSaveDialog}
        isPending={createTagMutation.isPending || bulkAddTagsMutation.isPending}
      />

      <AddEmployeesToTagDialog
        open={addEmployeesDialog.open}
        onOpenChange={(open) =>
          setAddEmployeesDialog((prev) => ({ ...prev, open }))
        }
        tagLabel={addEmployeesDialog.tagName}
        tagId={addEmployeesDialog.tagId}
        employees={employeesListForTag}
        selectedEmployees={selectedEmployeesForTag}
        onEmployeeToggle={handleEmployeeToggle}
        onClearEmployees={handleClearEmployees}
        onAdd={handleAddEmployeesToTag}
        isPending={bulkAddTagsMutation.isPending}
      />

      <EmployeesListDialog
        open={!!selectedTagForEmployees}
        onOpenChange={() => setSelectedTagForEmployees(null)}
        title={selectedTagForEmployees?.tagName ?? ""}
        employees={
          selectedTagForEmployees
            ? getTagEmployees(selectedTagForEmployees.tagId)
            : []
        }
        totalCount={
          selectedTagForEmployees
            ? getTagEmployeeCount(selectedTagForEmployees.tagId)
            : 0
        }
      />
    </>
  );
};
