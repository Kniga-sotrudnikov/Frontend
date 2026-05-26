import { useState, useCallback, useRef, useEffect } from "react";
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
  const [touchedFields, setTouchedFields] = useState<Set<keyof CreateEmployeeFormValues>>(new Set());
  
  // Refs для фокуса
  const firstInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  // Автофокус на первое поле при открытии диалога
  useEffect(() => {
    if (open) {
      // Небольшая задержка для анимации диалога
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Сброс формы при закрытии
  useEffect(() => {
    if (!open) {
      setValues(initialValues);
      setErrors({});
      setTouchedFields(new Set());
      setCalendarOpen(false);
    }
  }, [open]);

  // Проверка на пустые обязательные поля (для блокировки кнопки)
  const isFormValid = useCallback(() => {
    return values.fullName.trim() !== "" && 
           values.emailCorporate.trim() !== "";
  }, [values.fullName, values.emailCorporate]);

  const updateField = useCallback(<K extends keyof CreateEmployeeFormValues>(
    field: K,
    value: CreateEmployeeFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Очищаем ошибку только если поле было touched
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  // Отмечаем поле как touched при потере фокуса
  const handleFieldBlur = useCallback((field: keyof CreateEmployeeFormValues) => {
    setTouchedFields((prev) => new Set(prev).add(field));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors = validateForm(values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Отмечаем все поля как touched
    const allFields = Object.keys(values) as (keyof CreateEmployeeFormValues)[];
    setTouchedFields(new Set(allFields));
    
    if (!validate()) {
      // Фокусируемся на первом поле с ошибкой
      const firstErrorField = Object.keys(errors)[0] as keyof CreateEmployeeFormValues;
      if (firstErrorField === "photo") {
        // Для фото своя логика фокуса
        document.querySelector('[data-photo-upload]')?.scrollIntoView({ behavior: "smooth" });
      } else {
        const errorElement = document.getElementById(`field-${firstErrorField}`);
        errorElement?.focus();
        errorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit?.(values);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create employee:", error);
      // Показываем общую ошибку в форме
      setErrors((prev) => ({ 
        ...prev, 
        general: error instanceof Error ? error.message : "Ошибка при создании сотрудника" 
      }));
    } finally {
      setIsSubmitting(false);
    }
  }, [validate, values, onSubmit, onOpenChange, errors]);

  // Обработчик Enter
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Не отправляем форму, если нажат Enter внутри текстового поля
      const target = e.target as HTMLElement;
      if (target.tagName === "TEXTAREA" || target.tagName === "INPUT") {
        return;
      }
      e.preventDefault();
      submitButtonRef.current?.click();
    }
  }, []);

  // Кнопка создания карточки disabled, если форма не валидна или идет отправка
  const isSubmitDisabled = isSubmitting || !isFormValid();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="!w-[800px] !h-[832px] !max-w-none !p-0 !rounded-8 !border !border-gray-200 !bg-white"
        onKeyDown={handleKeyDown}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full gap-1">
          {/* Header с индикатором обязательных полей */}
          <div className="flex justify-between items-center px-5 pt-5 pb-0 flex-shrink-0">
            <DialogHeader className="!p-0">
              <DialogTitle className="text-[18px] font-semibold text-gray-900 leading-[22px]">
                Создание карточки сотрудника
              </DialogTitle>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-red-600">*</span> — обязательные поля
              </p>
            </DialogHeader>
            <DialogClose variant="icon" />
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <EmployeeForm
              values={values}
              errors={errors}
              onUpdate={updateField}
              onBlur={handleFieldBlur}
              calendarOpen={calendarOpen}
              onCalendarOpenChange={setCalendarOpen}
              touchedFields={touchedFields}
              firstInputRef={firstInputRef}
            />
            
            {/* Общая ошибка */}
            {errors.general && (
              <div className="mt-4 p-3 rounded-md bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}
          </div>

          {/* Кнопки с индикатором обязательных полей */}
          <div className="flex justify-between items-center px-4 pb-5 pt-0 flex-shrink-0 w-full">
            <div className="text-xs text-gray-400">
              {!isFormValid() && (
                <span>Заполните обязательные поля (<span className="text-red-600">*</span>)</span>
              )}
            </div>
            <div className="flex gap-1">
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
                ref={submitButtonRef}
                disabled={isSubmitDisabled}
                className="w-[165px] h-[32px] text-xs tracking-[-0.5px] bg-purple-500 hover:bg-purple-600 text-white rounded-[var(--radius-8) disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Создание...
                  </span>
                ) : "Создать карточку"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};