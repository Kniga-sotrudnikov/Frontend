import { useState, useCallback, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@ui/dialog";
import { Button } from "@ui/button";
import { useNotificationStore } from "@/shared/model/stores";
import type { EmployeeData } from "@/entities/employee";
import type { CreateEmployeeFormValues } from "@/features/create-employee/model/types";
import {
  validateForm,
  type ValidationErrors,
} from "@/features/create-employee/model/validation";
import { EmployeeForm } from "@/features/create-employee/ui/employee-form";
import {
  mapEmployeeToFormValues,
  mapStatusBack,
} from "@/features/create-employee/utils";

interface EditEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: EmployeeData;
  onSuccess?: (updatedEmployee: EmployeeData) => void;
}

export const EditEmployeeDialog = ({
  open,
  onOpenChange,
  employee,
  onSuccess,
}: EditEmployeeDialogProps) => {
  const [values, setValues] = useState<CreateEmployeeFormValues>(() =>
    mapEmployeeToFormValues(employee),
  );
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [touchedFields, setTouchedFields] = useState<
    Set<keyof CreateEmployeeFormValues>
  >(new Set());

  const firstInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const addNotification = useNotificationStore((state) => state.add);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setValues(mapEmployeeToFormValues(employee));
      setErrors({});
      setTouchedFields(new Set());
      setCalendarOpen(false);
    }
  }, [open, employee]);

  const isFormValid = useCallback(() => {
    return values.fullName.trim() !== "" && values.emailCorporate.trim() !== "";
  }, [values.fullName, values.emailCorporate]);

  const updateField = useCallback(
    <K extends keyof CreateEmployeeFormValues>(
      field: K,
      value: CreateEmployeeFormValues[K],
    ) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  const handleFieldBlur = useCallback(
    (field: keyof CreateEmployeeFormValues) => {
      setTouchedFields((prev) => new Set(prev).add(field));
    },
    [],
  );

  const validate = useCallback((): boolean => {
    const newErrors = validateForm(values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const allFields = Object.keys(
        values,
      ) as (keyof CreateEmployeeFormValues)[];
      setTouchedFields(new Set(allFields));

      if (!validate()) {
        const firstErrorField = Object.keys(errors).filter(
          (k) => k !== "general",
        )[0] as keyof CreateEmployeeFormValues;
        if (firstErrorField === "photo") {
          document
            .querySelector("[data-photo-upload]")
            ?.scrollIntoView({ behavior: "smooth" });
        } else {
          const errorElement = document.getElementById(
            `field-${firstErrorField}`,
          );
          errorElement?.focus();
          errorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      setIsSubmitting(true);
      try {
        const updatedEmployee: EmployeeData = {
          ...employee,
          name: values.fullName,
          position: values.position,
          department: values.department,
          linearManager: values.leader,
          city: values.city,
          status: mapStatusBack(values.status),
          photo:
            typeof values.photo === "string" ? values.photo : employee.photo,
          emailCorporate: values.emailCorporate,
          emailPersonal: values.emailPersonal,
          phoneCorporate: values.phoneCorporate,
          phonePersonal: values.phonePersonal,
          birthday: values.birthday?.toISOString(),
          competencies: values.competencies,
          // Новые поля - требуют уточнения у бэкенда
          // Добавляем только если они есть (не пустые строки)
          ...(values.resumeLink && { resumeLink: values.resumeLink }),
          ...(values.crmProfileLink && {
            crmProfileLink: values.crmProfileLink,
          }),
          ...(values.socialNetworkLink && {
            socialNetworkLink: values.socialNetworkLink,
          }),
          ...(values.aboutMe && { aboutMe: values.aboutMe }),
          ...(values.role && { role: values.role }),
        };

        // Здесь вызываем API для обновления
        // await updateEmployee(updatedEmployee);

        addNotification({
          type: "success",
          iconType: "success",
          title: "Успешно",
          message: "Карточка сотрудника успешно обновлена",
        });

        onOpenChange(false);
        onSuccess?.(updatedEmployee);
      } catch (error) {
        console.error("Failed to update employee:", error);
        addNotification({
          type: "error",
          title: "Ошибка",
          message:
            error instanceof Error
              ? error.message
              : "Не удалось обновить карточку сотрудника",
        });
        setErrors((prev) => ({
          ...prev,
          general:
            error instanceof Error
              ? error.message
              : "Ошибка при обновлении сотрудника",
        }));
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      validate,
      values,
      employee,
      onOpenChange,
      errors,
      addNotification,
      onSuccess,
    ],
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const target = e.target as HTMLElement;
      if (target.tagName === "TEXTAREA" || target.tagName === "INPUT") {
        return;
      }
      e.preventDefault();
      submitButtonRef.current?.click();
    }
  }, []);

  const isSubmitDisabled = isSubmitting || !isFormValid();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!w-[800px] !h-[832px] !max-w-none !p-0 !rounded-8 !border !border-gray-200 !bg-white"
        onKeyDown={handleKeyDown}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full gap-1">
          <div className="flex justify-between items-center px-5 pt-5 pb-0 flex-shrink-0">
            <DialogHeader className="!p-0">
              <DialogTitle className="text-[18px] font-semibold text-gray-900 leading-[22px]">
                Редактирование карточки сотрудника
              </DialogTitle>
            </DialogHeader>
            <DialogClose variant="icon" />
          </div>

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

            {errors.general && (
              <div className="mt-4 p-3 rounded-md bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center px-4 pb-5 pt-0 flex-shrink-0 w-full">
            <div className="text-xs text-gray-400">
              {!isFormValid() && (
                <span>
                  Заполните обязательные поля (
                  <span className="text-red-600">*</span>)
                </span>
              )}
            </div>
            <div className="flex gap-1">
              <Button
                type="button"
                variant="plain"
                onClick={() => onOpenChange(false)}
                className="w-[105px] h-[32px] border border-purple-500 bg-white text-xs text-purple-500 hover:bg-purple-50 rounded-[var(--radius-8)]"
              >
                Отменить
              </Button>
              <Button
                type="submit"
                ref={submitButtonRef}
                disabled={isSubmitDisabled}
                className="w-[180px] h-[32px] text-xs tracking-[-0.5px] bg-purple-500 hover:bg-purple-600 text-white rounded-[var(--radius-8)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-3 w-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Сохранение...
                  </span>
                ) : (
                  "Сохранить карточку"
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
