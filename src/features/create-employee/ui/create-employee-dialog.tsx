import { useState, useCallback, useMemo  } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@ui/dialog";
import { Button } from "@ui/button";
import type { CreateEmployeeFormValues } from "../model/types";
import { validateForm, type ValidationErrors } from "../model/validation";
import { EmployeeForm } from "./employee-form";

interface CreateEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CreateEmployeeFormValues) => Promise<void>;
}

const initialValues: CreateEmployeeFormValues = {
  photo: undefined,
  fullName: "",
  position: "",
  department: "",
  leader: "",
  emailCorporate: "",
  emailPersonal: "",
  phoneCorporate: "",
  phonePersonal: "",
  birthday: undefined,
  city: "",
  status: "active",
  competencies: [],
};

export const CreateEmployeeDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: CreateEmployeeDialogProps) => {
  const [values, setValues] = useState<CreateEmployeeFormValues>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Оптимизация 1: useCallback для updateField
  const updateField = useCallback(<K extends keyof CreateEmployeeFormValues>(
    field: K,
    value: CreateEmployeeFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      // Обновляем errors только если поле есть в ошибках
      if (prev[field]) {
        return { ...prev, [field]: undefined };
      }
      return prev;
    });
  }, []); // Нет зависимостей, потому что используем функциональное обновление

  // Оптимизация 2: useCallback для validate
  const validate = useCallback((): boolean => {
    const newErrors = validateForm(values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]); // Зависит от values

  // Оптимизация 3: useCallback для handleSubmit
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.(values);
      setValues(initialValues);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create employee:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validate, values, onSubmit, onOpenChange]);

  // Оптимизация 4: useMemo для мемоизации пропсов EmployeeForm
  const employeeFormProps = useMemo(() => ({
    values,
    errors,
    onUpdate: updateField,
    calendarOpen,
    onCalendarOpenChange: setCalendarOpen,
  }), [values, errors, updateField, calendarOpen]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[800px] !h-[832px] !max-w-none !p-0 !rounded-8 !border !border-gray-200 !bg-white">
        <form onSubmit={handleSubmit} className="flex flex-col h-full gap-1">
          {/* Header */}
          <div className="flex justify-between items-center px-5 pt-5 pb-0 flex-shrink-0">
            <DialogHeader className="!p-0">
              <DialogTitle className="text-[18px] font-semibold text-gray-900 leading-[22px]">
                Создание карточки сотрудника
              </DialogTitle>
            </DialogHeader>
            <DialogClose variant="icon" />
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
          <EmployeeForm {...employeeFormProps} />
          </div>

          {/* Кнопки */}
          <div className="flex justify-end gap-1 px-4 pb-5 pt-0 flex-shrink-0 w-full">
            <Button
              type="button"
              variant="plain"
              onClick={() => onOpenChange(false)}
              className="w-[105px] h-[32px] border border-purple-500 bg-white text-xs text-purple-500 hover:bg-purple-50 rounded-[var(--radius-8)"
            >
              Отменить
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-[165px] h-[32px] text-xs tracking-[-0.5px] bg-purple-500 hover:bg-purple-600 text-white rounded-[var(--radius-8)"
            >
              {isSubmitting ? "Создание..." : "Создать карточку"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};