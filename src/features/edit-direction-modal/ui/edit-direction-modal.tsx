import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useNotificationStore } from "@/shared/model/stores";
import { EmployeeSelect, shortEmployees as mockEmployees } from "@/entities/employee";
import { DepartmentsSection } from "./departments-section";
import type {
  EditDirectionModalProps,
  Department,
} from "../model/types";

const DESCRIPTION_MAX_LENGTH = 300;

export function EditDirectionModal({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  entityType,
  initialName = "",
  initialHeadName = "",
  initialHeadId = null,
  shortEmployees = mockEmployees,
  initialDescription = "",
  departments: initialDepartments = [],
  onAddDepartment,
  onEditDepartment,
  onDeleteDepartment,
  onSave,
}: EditDirectionModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled
    ? (val: boolean) => controlledOnOpenChange?.(val)
    : setInternalOpen;
  const [name, setName] = useState(initialName);
  const [headName, setHeadName] = useState(initialHeadName);
  const [headId, setHeadId] = useState<number | null>(initialHeadId);
  const [description, setDescription] = useState(initialDescription);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  const addNotification = useNotificationStore((state) => state.add);

  const showDevNotification = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Функция будет доступна в ближайшее время",
    });
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setName(initialName);
      setHeadName(initialHeadName);
      setHeadId(initialHeadId);
      setDescription(initialDescription);
      setDepartments(initialDepartments);
    }
    setOpen(isOpen);
  };

  const handleSave = () => {
    if (onSave) {
      onSave?.({ name, headName, description }, departments);
    } else {
       showDevNotification();
    }
  };

  const handleAddDepartment = () => {
    if (onAddDepartment) {
      onAddDepartment();
    } else {
      showDevNotification();
    }
  };

  const handleEditDepartment = (dept: Department) => {
    if (onEditDepartment) {
      onEditDepartment(dept);
    } else {
      showDevNotification();
    }
  };

  const handleDeleteDepartment = (dept: Department) => {
    if (onDeleteDepartment) {
      onDeleteDepartment(dept);
    } else {
      showDevNotification();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-188! rounded-8 gap-6 px-7 py-8 flex flex-col h-auto">
        <div className="flex items-center justify-between shrink-0">
          <h2 className="body-m-semibold text-black">
            {(entityType === 'direction') ? "Редактировать направление" : "Редактировать СИС"}
          </h2>
          <DialogClose variant="icon" />
        </div>

        <div className="flex flex-col flex-1 gap-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="body-s-semibold text-gray-700">
                {(entityType === 'direction') ? "Название направления" : "Название службы"}
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите название"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="body-s-semibold text-gray-700">
                {(entityType === "direction") ? "Руководитель направления" : "Руководитель службы"}
              </label>
              <EmployeeSelect
                value={headId}
                employees={shortEmployees}
                onSelect={(id, name) => { setHeadId(id); setHeadName(name); }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="body-s-semibold text-gray-700">Описание</label>
            <Textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value.slice(0, DESCRIPTION_MAX_LENGTH))
              }
              placeholder="Введите описание"
              className="min-h-24 resize-none"
            />
            <span className="body-s text-gray-500 self-end">
              {description.length}/{DESCRIPTION_MAX_LENGTH}
            </span>
          </div>

          <DepartmentsSection
            items={departments}
            onAdd={handleAddDepartment}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
            onReorder={setDepartments}
          />
        </div>

        <div className="flex justify-end gap-3.75 shrink-0">
          <DialogClose variant="custom" asChild>
            <Button
              variant="ghost"
              size="plain"
              className="button-small px-4 h-8"
            >
              Отмена
            </Button>
          </DialogClose>
          <Button
            variant="default"
            size="plain"
            className="button-small px-4 h-8"
            onClick={handleSave}
          >
            Сохранить изменения
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
