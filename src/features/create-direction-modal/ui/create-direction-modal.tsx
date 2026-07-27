import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@ui/dialog";
import { Button } from "@/shared/ui/button";
import { useNotificationStore } from "@/shared/model/stores";
import {
  DirectionFormFields,
  OrgSection,
  useCreateDepartment,
  type OrgItemType,
} from "@/entities/org-structure";
import type { CreateDirectionModalProps } from "../model/types";
import { EmployeeSelectField } from "./employee-select-field";
import { DepartmentForm, type DepartmentFormData } from "./department-form";

const TOTAL_STEPS = 2;

const EMPTY_DRAFT: Omit<DepartmentFormData, "id"> = {
  name: "",
  headId: null,
  headName: "",
  employeeIds: [],
};

export function CreateDirectionModal({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  entityType = "direction",
  onCreate,
}: CreateDirectionModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled
    ? (val: boolean) => controlledOnOpenChange?.(val)
    : setInternalOpen;

  const [name, setName] = useState("");
  const [headName, setHeadName] = useState("");
  const [headId, setHeadId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [step, setStep] = useState(1);
  const [departments, setDepartments] = useState<DepartmentFormData[]>([]);
  const [draft, setDraft] =
    useState<Omit<DepartmentFormData, "id">>(EMPTY_DRAFT);
  const [editingDepartmentId, setEditingDepartmentId] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createDepartment = useCreateDepartment();
  const addNotification = useNotificationStore((state) => state.add);

  const isDirection = entityType === "direction";
  const entityGenitive = isDirection ? "направления" : "службы";

  const resetForm = () => {
    setName("");
    setHeadName("");
    setHeadId(null);
    setDescription("");
    setStep(1);
    setDepartments([]);
    setDraft(EMPTY_DRAFT);
    setEditingDepartmentId(null);
    setIsSubmitting(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) resetForm();
    setOpen(isOpen);
  };

  const handleNext = () => {
    if (!name.trim()) {
      addNotification({
        type: "error",
        iconType: "error",
        title: "Ошибка",
        message: "Название обязательно для заполнения",
      });
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFinish = async () => {
    if (!name.trim()) {
      addNotification({
        type: "error",
        iconType: "error",
        title: "Ошибка",
        message: "Название обязательно для заполнения",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const directionResponse = await createDepartment.mutateAsync({
        name: name.trim(),
        type: isDirection ? "direction" : "sis",
        description: description.trim() || undefined,
        head_id: headId,
      });

      const directionId = directionResponse.data.id;

      for (const department of departments) {
        await createDepartment.mutateAsync({
          name: department.name,
          type: "department",
          parent: directionId,
          head_id: department.headId,
        });
      }

      handleOpenChange(false);
      onCreate?.({
        name,
        headName,
        headId,
        description,
      });
    } catch (error) {
      addNotification({
        type: "error",
        iconType: "error",
        title: "Ошибка",
        message:
          error instanceof Error
            ? error.message
            : "Не удалось создать направление",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDepartmentSave = (values: Omit<DepartmentFormData, "id">) => {
    if (editingDepartmentId) {
      setDepartments((prev) =>
        prev.map((department) =>
          department.id === editingDepartmentId
            ? { ...department, ...values }
            : department,
        ),
      );
      setEditingDepartmentId(null);
    } else {
      setDepartments((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          ...values,
        },
      ]);
    }
    setDraft(EMPTY_DRAFT);
  };

  const handleDepartmentCancel = () => {
    setDraft(EMPTY_DRAFT);
    setEditingDepartmentId(null);
  };

  const handleDepartmentEdit = (item: OrgItemType) => {
    const department = departments.find((d) => d.id === item.id);
    if (!department) return;

    setDraft({
      name: department.name,
      headId: department.headId,
      headName: department.headName,
      employeeIds: department.employeeIds,
    });
    setEditingDepartmentId(department.id);
  };

  const handleDepartmentDelete = (item: OrgItemType) => {
    setDepartments((prev) =>
      prev.filter((department) => department.id !== item.id),
    );
  };

  const handleDepartmentReorder = (items: OrgItemType[]) => {
    const orderMap = new Map(items.map((item, index) => [item.id, index]));
    setDepartments((prev) =>
      [...prev].sort((a, b) => {
        const aIndex = orderMap.get(a.id) ?? 0;
        const bIndex = orderMap.get(b.id) ?? 0;
        return aIndex - bIndex;
      }),
    );
  };

  const isNameValid = name.trim().length > 0;
  const title =
    step === 2
      ? "Добавить отделы"
      : isDirection
        ? "Создать направление"
        : "Создать СИС";

  const orgSectionItems: OrgItemType[] = departments.map((department) => ({
    id: department.id,
    name: department.name,
    headName: department.headName,
  }));

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-188! rounded-8 gap-6 px-7 py-8 flex flex-col h-auto">
        <div className="flex flex-col gap-1 shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="body-m-semibold text-black">{title}</h2>
            <DialogClose variant="icon" />
          </div>
          <span className="body-s text-gray-900">
            Шаг {step} из {TOTAL_STEPS}
          </span>
        </div>

        <div className="flex flex-col flex-1 gap-6 overflow-y-auto">
          {step === 1 ? (
            <DirectionFormFields
              nameLabel="Название*"
              name={name}
              onNameChange={setName}
              headLabel="Руководитель"
              headSlot={
                <EmployeeSelectField
                  value={headId}
                  onChange={(id, selectedName) => {
                    setHeadId(id);
                    setHeadName(selectedName);
                  }}
                  placeholder="Выберите руководителя"
                />
              }
              description={description}
              onDescriptionChange={setDescription}
              descriptionPlaceholder={`Краткое описание ${entityGenitive}`}
            />
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 rounded-8 bg-gray-50 p-4">
                <p className="body-s text-gray-900">
                  Вы создаёте отделы для направления:{" "}
                  <span className="body-s-semibold text-black">{name}</span>
                </p>
                <p className="body-s text-gray-900">
                  Руководитель:{" "}
                  <span className="body-s-semibold text-black">
                    {headName || "Не выбран"}
                  </span>
                </p>
              </div>

              <OrgSection
                title="Отделы"
                addButtonText="Добавить отдел"
                items={orgSectionItems}
                onAdd={() => {
                  setDraft(EMPTY_DRAFT);
                  setEditingDepartmentId(null);
                }}
                onEdit={handleDepartmentEdit}
                onDelete={handleDepartmentDelete}
                onReorder={handleDepartmentReorder}
              >
                <DepartmentForm
                  initialValues={draft}
                  isEditing={!!editingDepartmentId}
                  onSave={handleDepartmentSave}
                  onCancel={handleDepartmentCancel}
                />
              </OrgSection>
            </div>
          )}
        </div>

        {step === 1 ? (
          <div className="flex justify-end gap-3.75 shrink-0">
            <DialogClose variant="custom" asChild>
              <Button
                variant="ghost"
                size="plain"
                className="button-small px-4 h-8"
                disabled={isSubmitting || createDepartment.isPending}
              >
                Отменить
              </Button>
            </DialogClose>
            <Button
              variant="outline"
              size="plain"
              className="button-small px-4 h-8"
              disabled={
                !isNameValid || isSubmitting || createDepartment.isPending
              }
              onClick={handleFinish}
            >
              {isSubmitting || createDepartment.isPending
                ? "Сохранение..."
                : `Сохранить ${isDirection ? "направление" : "СИС"}`}
            </Button>
            <Button
              variant="default"
              size="plain"
              className="button-small px-4 h-8"
              disabled={
                !isNameValid || isSubmitting || createDepartment.isPending
              }
              onClick={handleNext}
            >
              Далее
            </Button>
          </div>
        ) : (
          <div className="flex justify-between shrink-0">
            <Button
              variant="outline"
              size="plain"
              className="button-small px-4 h-8"
              disabled={isSubmitting || createDepartment.isPending}
              onClick={handleBack}
            >
              Назад
            </Button>
            <Button
              variant="default"
              size="plain"
              className="button-small px-4 h-8"
              disabled={
                !isNameValid || isSubmitting || createDepartment.isPending
              }
              onClick={handleFinish}
            >
              {isSubmitting || createDepartment.isPending
                ? "Сохранение..."
                : "Готово"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
