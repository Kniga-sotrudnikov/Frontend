import { useState, useCallback, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@ui/dialog";
import { Button } from "@ui/button";
import { usePreventDialogClose } from "@/shared/lib/hooks/use-prevent-dialog-close";
import {
  useEmployeeDetail,
  usePatchEmployee,
  type EmployeeData,
  type PatchEmployeeRequest,
} from "@/entities/employee";
import type { CreateEmployeeFormValues } from "@/features/create-employee";
import {
  validateForm,
  type ValidationErrors,
} from "@/features/create-employee/model/validation";
import { EmployeeForm } from "@/features/create-employee/ui/employee-form";
import { format } from "date-fns";
import { usePatchEmployeePhoto } from "@/entities/employee/model/employee-mutations";
import { mapEmployeeToForm } from "../model/mapper";

interface EditEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: EmployeeData; // используется только для id
  onSubmit?: (data: CreateEmployeeFormValues) => Promise<void>;
  onSuccess?: (updatedEmployee: EmployeeData) => void;
}

const buildPatchPayload = (
  current: CreateEmployeeFormValues,
  initial: CreateEmployeeFormValues,
): PatchEmployeeRequest => {
  const patch: Partial<PatchEmployeeRequest> = {};

  if (current.fullName !== initial.fullName) patch.full_name = current.fullName;

  if (current.position !== initial.position) patch.job_title = current.position;

  if (current.role !== initial.role)
    patch.role_description = current.role
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  if (current.emailCorporate !== initial.emailCorporate)
    patch.email = current.emailCorporate;

  if (current.emailPersonal !== initial.emailPersonal)
    patch.personal_email = current.emailPersonal;

  if (current.phoneCorporate !== initial.phoneCorporate)
    patch.phone = current.phoneCorporate;

  if (current.phonePersonal !== initial.phonePersonal)
    patch.personal_phone = current.phonePersonal;

  if (current.aboutMe !== initial.aboutMe) patch.interests = current.aboutMe;

  if (current.birthday?.toISOString() !== initial.birthday?.toISOString()) {
    patch.birthday = format(current.birthday as Date, "yyyy-MM-dd");
  }

  if (current.department !== initial.department)
    patch.department = Number(current.department);

  if (current.city !== initial.city) patch.city = current.city;

  if (current.status !== initial.status)
    patch.employment_status = current.status;

  if (current.crmProfileLink !== initial.crmProfileLink)
    patch.crm_profile = current.crmProfileLink;

  if (current.resumeLink !== initial.resumeLink)
    patch.resume_link = current.resumeLink;

  if (current.socialNetworkLink !== initial.socialNetworkLink)
    patch.social_network = current.socialNetworkLink;

  if (current.leader !== initial.leader)
    patch.supervisor = Number(current.leader);

  //TODO: Пока не передаются теги

  return patch as PatchEmployeeRequest;
};

export const EditEmployeeDialog = ({
  open,
  onOpenChange,
  employee,
}: EditEmployeeDialogProps) => {
  // ✅ берём id
  const employeeId = employee.id;

  // ✅ получаем данные с сервера
  const { data, isLoading, error } = useEmployeeDetail(Number(employeeId));
  const { mutateAsync } = usePatchEmployee();
  const { mutateAsync: patchPhoto } = usePatchEmployeePhoto();

  const [values, setValues] = useState<CreateEmployeeFormValues | null>(null);
  const [initialValues, setInitialValues] =
    useState<CreateEmployeeFormValues | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [touchedFields, setTouchedFields] = useState<
    Set<keyof CreateEmployeeFormValues>
  >(new Set());

  const firstInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const preventDialogClose = usePreventDialogClose();

  // ✅ ИНИЦИАЛИЗАЦИЯ ТЕПЕРЬ ИЗ data
  useEffect(() => {
    if (open && data) {
      const mapped = mapEmployeeToForm(data);
      setValues(mapped);
      setInitialValues(mapped); // 👈 сохраняем базу
      setErrors({});
      setTouchedFields(new Set());
      setCalendarOpen(false);
    }
  }, [open, data]);

  // autofocus
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const isFormValid = useCallback(() => {
    if (!values) return false;
    return values.fullName.trim() !== "" && values.emailCorporate.trim() !== "";
  }, [values]);

  const updateField = useCallback(
    <K extends keyof CreateEmployeeFormValues>(
      field: K,
      value: CreateEmployeeFormValues[K],
    ) => {
      setValues((prev) => {
        if (!prev) return prev;
        return { ...prev, [field]: value };
      });

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
    if (!values) return false;
    const newErrors = validateForm(values);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!values || !initialValues) return;

      const allFields = Object.keys(
        values,
      ) as (keyof CreateEmployeeFormValues)[];
      setTouchedFields(new Set(allFields));

      if (!validate()) return;

      setIsSubmitting(true);

      try {
        // 1️⃣ PATCH обычных данных
        const payload = buildPatchPayload(values, initialValues);

        await mutateAsync({
          id: employeeId,
          data: payload,
        });

        // 2️⃣ PATCH фото (если новое)
        if (values.photo instanceof File) {
          await patchPhoto({
            id: Number(employeeId),
            file: values.photo,
          });
        }

        onOpenChange(false);
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          general:
            error instanceof Error ? error.message : "Ошибка при обновлении",
        }));
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      values,
      initialValues,
      validate,
      mutateAsync,
      patchPhoto,
      employeeId,
      onOpenChange,
    ],
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      const target = e.target as HTMLElement;
      if (target.tagName === "TEXTAREA" || target.tagName === "INPUT") return;
      e.preventDefault();
      submitButtonRef.current?.click();
    }
  }, []);

  const isSubmitDisabled = isSubmitting || !isFormValid();

  // ✅ состояния загрузки
  if (isLoading) return null;
  if (error) return null;

  if (!values) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!w-[800px] !h-[832px] !max-w-none !p-0 !rounded-8 !border !border-gray-200 !bg-white"
        onKeyDown={handleKeyDown}
        onInteractOutside={preventDialogClose}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full gap-1">
          <div className="flex justify-between items-center px-5 pt-5 pb-0">
            <DialogHeader className="!p-0">
              <DialogTitle className="text-[18px] font-semibold">
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
              leaderLabel={data?.supervisor?.name}
            />

            {errors.general && (
              <div className="mt-4 p-3 rounded-md bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center px-4 pb-5">
            <div className="text-xs text-gray-400">
              {!isFormValid() && (
                <span>
                  Заполните обязательные поля (
                  <span className="text-red-600">*</span>)
                </span>
              )}
            </div>

            <div className="flex gap-1">
              <Button type="button" onClick={() => onOpenChange(false)}>
                Отменить
              </Button>

              <Button
                type="submit"
                ref={submitButtonRef}
                disabled={isSubmitDisabled}
              >
                {isSubmitting ? "Сохранение..." : "Сохранить карточку"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};