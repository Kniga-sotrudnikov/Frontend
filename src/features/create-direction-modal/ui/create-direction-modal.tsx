import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@ui/dialog";
import { Button } from "@/shared/ui/button";
import { useNotificationStore } from "@/shared/model/stores";
import {
  EmployeeSelect,
  shortEmployees as mockEmployees,
} from "@/entities/employee";
import { DirectionFormFields } from "@/entities/org-structure";
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

  const addNotification = useNotificationStore((state) => state.add);

  const isDirection = entityType === "direction";
  const entityWord = isDirection ? "направление" : "СИС";
  const entityGenitive = isDirection ? "направления" : "службы";

  const showDevNotification = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Функция будет доступна в ближайшее время",
    });
  };

  const resetForm = () => {
    setName("");
    setHeadName("");
    setHeadId(null);
    setDescription("");
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) resetForm();
    setOpen(isOpen);
  };

  const handleCreate = () => {
    if (onCreate) {
      onCreate({ name, headName, headId, description });
    } else {
      showDevNotification();
    }
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
          <span className="body-s text-gray-900">Шаг 1 из {TOTAL_STEPS}</span>
        </div>

        <div className="flex flex-col flex-1 gap-6 overflow-y-auto">
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
        </div>

        <div className="flex justify-end gap-3.75 shrink-0">
          <DialogClose variant="custom" asChild>
            <Button
              variant="ghost"
              size="plain"
              className="button-small px-4 h-8"
            >
              Отменить
            </Button>
          </DialogClose>
          <Button
            variant="outline"
            size="plain"
            className="button-small px-4 h-8 border-primary text-black"
            disabled={!isNameValid}
            onClick={handleCreate}
          >
            Сохранить {entityWord}
          </Button>
          <Button
            variant="default"
            size="plain"
            className="button-small px-4 h-8"
            disabled={!isNameValid}
            onClick={showDevNotification}
          >
            Далее
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
