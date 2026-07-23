import { useState, useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import * as Label from "@radix-ui/react-label";
import { EmployeeSelectField } from "./employee-select-field";
import { EmployeesMultiSelect } from "./employees-multi-select";

export interface DepartmentFormData {
  id: string;
  name: string;
  headId: number | null;
  headName: string;
  employeeIds: number[];
}

interface DepartmentFormProps {
  initialValues?: Partial<DepartmentFormData>;
  isEditing?: boolean;
  onSave: (values: Omit<DepartmentFormData, "id">) => void;
  onCancel: () => void;
}

export const DepartmentForm = ({
  initialValues,
  isEditing = false,
  onSave,
  onCancel,
}: DepartmentFormProps) => {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [headId, setHeadId] = useState<number | null>(
    initialValues?.headId ?? null,
  );
  const [headName, setHeadName] = useState(initialValues?.headName ?? "");
  const [employeeIds, setEmployeeIds] = useState<number[]>(
    initialValues?.employeeIds ?? [],
  );

  useEffect(() => {
    setName(initialValues?.name ?? "");
    setHeadId(initialValues?.headId ?? null);
    setHeadName(initialValues?.headName ?? "");
    setEmployeeIds(initialValues?.employeeIds ?? []);
  }, [initialValues]);

  const handleSave = () => {
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      headId,
      headName,
      employeeIds,
    });
  };

  const isNameValid = name.trim().length > 0;

  return (
    <div className="flex flex-col gap-3 rounded-8 border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-1.5">
        <Label.Root className="body-s-semibold text-muted-foreground">
          Название отдела / команды
        </Label.Root>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите название"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label.Root className="body-s-semibold text-muted-foreground">
          Руководитель
        </Label.Root>
        <EmployeeSelectField
          value={headId}
          onChange={(id, selectedName) => {
            setHeadId(id);
            setHeadName(selectedName);
          }}
          placeholder="Выберите руководителя"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label.Root className="body-s-semibold text-muted-foreground">
          Сотрудники
        </Label.Root>
        <EmployeesMultiSelect
          value={employeeIds}
          onChange={setEmployeeIds}
          placeholder="Выберите сотрудников"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="ghost"
          size="plain"
          className="button-small px-4 h-8"
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button
          type="button"
          variant="default"
          size="plain"
          className="button-small px-4 h-8"
          disabled={!isNameValid}
          onClick={handleSave}
        >
          {isEditing ? "Сохранить изменения" : "Сохранить"}
        </Button>
      </div>
    </div>
  );
};
