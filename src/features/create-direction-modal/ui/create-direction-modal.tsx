import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@ui/dialog";
import { Button } from "@/shared/ui/button";
import { useNotificationStore } from "@/shared/model/stores";
import {
  EmployeeSelect,
  shortEmployees as mockEmployees,
} from "@/entities/employee";
import { DirectionFormFields } from "@/entities/org-structure";
import { useCreateDepartment } from "@/entities/org-structure/api/use-department-mutations";
import type { CreateDirectionModalProps } from "../model/types";

const TOTAL_STEPS = 2;

export function CreateDirectionModal({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  entityType = "direction",
  shortEmployees = mockEmployees,
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

  const createDepartment = useCreateDepartment();
  const addNotification = useNotificationStore((state) => state.add);

  const isDirection = entityType === "direction";
  const entityWord = isDirection ? "направление" : "СИС";
  const entityGenitive = isDirection ? "направления" : "службы";

  const resetForm = () => {
    setName("");
    setHeadName("");
    setHeadId(null);
    setDescription("");
    setStep(1);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) resetForm();
    setOpen(isOpen);
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      addNotification({
        type: "error",
        iconType: "error",
        title: "Ошибка",
        message: "Название обязательно для заполнения",
      });
      return;
    }

    try {
      await createDepartment.mutateAsync({
        name: name.trim(),
        type: isDirection ? "direction" : "sis",
        description: description.trim() || undefined,
        // Если нужно привязывать к руководителю, добавляем поле head_id
        // head_id: headId,
      });

      handleOpenChange(false);
      
      onCreate?.({
        name,
        headName,
        headId,
        description,
      });
    } catch (error) {
      console.error("Error creating department:", error);
    }
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

  const isNameValid = name.trim().length > 0;
  const title = isDirection ? "Создать направление" : "Создать СИС";

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
                <EmployeeSelect
                  value={headId}
                  employees={shortEmployees}
                  onSelect={(id, selectedName) => {
                    setHeadId(id);
                    setHeadName(selectedName);
                  }}
                />
              }
              description={description}
              onDescriptionChange={setDescription}
              descriptionPlaceholder={`Краткое описание ${entityGenitive}`}
            />
          ) : (
            // TODO Шаг 2 - добавление отделов
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-center text-gray-500">
                Шаг 2: Добавление отделов (в разработке)
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3.75 shrink-0">
          <DialogClose variant="custom" asChild>
            <Button
              variant="ghost"
              size="plain"
              className="button-small px-4 h-8"
              disabled={createDepartment.isPending}
            >
              Отменить
            </Button>
          </DialogClose>
          {step === 1 ? (
            <>
              <Button
                variant="outline"
                size="plain"
                className="button-small px-4 h-8 border-primary text-black"
                disabled={!isNameValid || createDepartment.isPending}
                onClick={handleCreate}
              >
                Сохранить {entityWord}
              </Button>
              <Button
                variant="default"
                size="plain"
                className="button-small px-4 h-8"
                disabled={!isNameValid || createDepartment.isPending}
                onClick={handleNext}
              >
                Далее
              </Button>
            </>
          ) : (
            <Button
              variant="default"
              size="plain"
              className="button-small px-4 h-8"
              onClick={handleCreate}
              disabled={createDepartment.isPending}
            >
              {createDepartment.isPending ? "Сохранение..." : "Завершить"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}