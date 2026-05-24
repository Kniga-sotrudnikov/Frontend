import { useState } from "react";
import * as Select from "@radix-ui/react-select";
import * as Label from "@radix-ui/react-label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@ui/dialog";
import { FormInput } from "./form-input";
import { Button } from "@ui/button";
import { Calendar } from "@ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { cn } from "@/shared/lib";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import CalendarIcon from "@/shared/assets/icons/calendar.svg?react";
import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg?react";
import CheckMarkIcon from "@/shared/assets/icons/check-mark.svg?react";
import type { TEmployeeStatus } from "@/entities/employee";
import { PhotoUpload } from "./photo-upload";
import { CompetenciesSelect } from "./competencies-select";
import {
  DEPARTMENT_OPTIONS,
  LEADER_OPTIONS,
  CITY_OPTIONS,
} from "../model/constants";
import type { CreateEmployeeFormValues } from "../model/types";

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

const statusOptions = [
  { value: "active", label: "В работе" },
  { value: "vacation", label: "В отпуске" },
  { value: "sick", label: "На больничном" },
  { value: "maternity", label: "В декрете" },
];

export const CreateEmployeeDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: CreateEmployeeDialogProps) => {
  const [values, setValues] = useState<CreateEmployeeFormValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateEmployeeFormValues, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const updateField = <K extends keyof CreateEmployeeFormValues>(
    field: K,
    value: CreateEmployeeFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateEmployeeFormValues, string>> =
      {};

    if (!values.fullName.trim()) {
      newErrors.fullName = "Обязательное поле";
    }
    if (!values.position.trim()) {
      newErrors.position = "Обязательное поле";
    }
    if (!values.department) {
      newErrors.department = "Обязательное поле";
    }
    if (!values.emailCorporate.trim()) {
      newErrors.emailCorporate = "Обязательное поле";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.emailCorporate)) {
      newErrors.emailCorporate = "Некорректный email";
    }
    if (!values.phoneCorporate.trim()) {
      newErrors.phoneCorporate = "Обязательное поле";
    }
    if (!values.birthday) {
      newErrors.birthday = "Обязательное поле";
    }
    if (!values.city) {
      newErrors.city = "Обязательное поле";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
  };

  const renderSelect = (
    value: string,
    onValueChange: (value: string) => void,
    options: { value: string; label: string }[],
    placeholder: string,
    error?: boolean,
  ) => (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className={cn(
          "flex h-[44px] w-full items-center justify-between rounded-md border border-input bg-white px-3 py-3 text-xs shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1",
          error && "border-red-600",
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ArrowDownIcon className="size-4 opacity-50" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-xs outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <Select.ItemIndicator className="absolute left-2 inline-flex size-3.5 items-center justify-center">
                  <CheckMarkIcon className="size-4" />
                </Select.ItemIndicator>
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );

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
          <div className="flex-1 px-5 py-4">
            {/* PhotoUpload */}
            <div className="mb-5">
              <PhotoUpload
                value={values.photo}
                onChange={(file) => updateField("photo", file)}
                error={errors.photo}
              />
            </div>

            {/* Форма с двумя колонками */}
            <div className="grid grid-cols-2 gap-x-3">
              {/* Левая колонка */}
              <div className="flex flex-col gap-2">
                <div className="space-y-2">
                  <Label.Root
                    htmlFor="fullName"
                    className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
                  >
                    Полное имя
                  </Label.Root>
                  <FormInput
                    id="fullName"
                    value={values.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="Иванов Алексей Петрович"
                    error={!!errors.fullName}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
                    Отдел
                  </Label.Root>
                  {renderSelect(
                    values.department,
                    (value) => updateField("department", value),
                    DEPARTMENT_OPTIONS.map((dept) => ({
                      value: dept,
                      label: dept,
                    })),
                    "Выберите отдел",
                    !!errors.department,
                  )}
                  {errors.department && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.department}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label.Root
                    htmlFor="emailCorporate"
                    className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
                  >
                    Электронная почта (корпоративная)
                  </Label.Root>
                  <FormInput
                    id="emailCorporate"
                    type="email"
                    value={values.emailCorporate}
                    onChange={(e) =>
                      updateField("emailCorporate", e.target.value)
                    }
                    placeholder="alexey.ivanov@company.com"
                    error={!!errors.emailCorporate}
                  />
                  {errors.emailCorporate && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.emailCorporate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label.Root
                    htmlFor="phoneCorporate"
                    className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
                  >
                    Телефон (корпоративный)
                  </Label.Root>
                  <FormInput
                    id="phoneCorporate"
                    value={values.phoneCorporate}
                    onChange={(e) =>
                      updateField("phoneCorporate", e.target.value)
                    }
                    placeholder="+7 (495) 123-45-67"
                    error={!!errors.phoneCorporate}
                  />
                  {errors.phoneCorporate && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.phoneCorporate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
                    День рождения
                  </Label.Root>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-between text-left font-normal h-8 text-xs mt-2",
                          !values.birthday && "text-muted-foreground",
                          errors.birthday && "border-red-600",
                        )}
                      >
                        <span>
                          {values.birthday
                            ? format(values.birthday, "dd MMMM yyyy", {
                                locale: ru,
                              })
                            : "Выберите дату"}
                        </span>
                        <CalendarIcon className="size-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={values.birthday}
                        onSelect={(date) => {
                          updateField("birthday", date);
                          setCalendarOpen(false);
                        }}
                        locale={ru}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.birthday && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.birthday}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
                    Статус
                  </Label.Root>
                  {renderSelect(
                    values.status,
                    (value) => updateField("status", value as TEmployeeStatus),
                    statusOptions,
                    "Выберите статус",
                  )}
                </div>
              </div>

              {/* Правая колонка */}
              <div className="flex flex-col gap-2">
                <div className="space-y-2">
                  <Label.Root
                    htmlFor="position"
                    className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
                  >
                    Должность
                  </Label.Root>
                  <FormInput
                    id="position"
                    value={values.position}
                    onChange={(e) => updateField("position", e.target.value)}
                    placeholder="Менеджер по карьерному развитию"
                    error={!!errors.position}
                  />
                  {errors.position && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.position}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
                    Руководитель
                  </Label.Root>
                  {renderSelect(
                    values.leader,
                    (value) => updateField("leader", value),
                    LEADER_OPTIONS.map((leader) => ({
                      value: leader,
                      label: leader,
                    })),
                    "Выберите руководителя",
                  )}
                </div>

                <div className="space-y-2">
                  <Label.Root
                    htmlFor="emailPersonal"
                    className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
                  >
                    Электронная почта (личная)
                  </Label.Root>
                  <FormInput
                    id="emailPersonal"
                    type="email"
                    value={values.emailPersonal}
                    onChange={(e) =>
                      updateField("emailPersonal", e.target.value)
                    }
                    placeholder="alexey.ivanov@gmail.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label.Root
                    htmlFor="phonePersonal"
                    className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
                  >
                    Телефон (личный)
                  </Label.Root>
                  <FormInput
                    id="phonePersonal"
                    value={values.phonePersonal}
                    onChange={(e) =>
                      updateField("phonePersonal", e.target.value)
                    }
                    placeholder="+7 (000) 000-00-00"
                  />
                </div>

                <div className="space-y-2">
                  <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
                    Город
                  </Label.Root>
                  {renderSelect(
                    values.city,
                    (value) => updateField("city", value),
                    CITY_OPTIONS.map((city) => ({ value: city, label: city })),
                    "Выберите город",
                    !!errors.city,
                  )}
                  {errors.city && (
                    <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                  )}
                </div>

                {/* Компетенции - теперь во второй колонке */}
                <div className="space-y-2 -mt-2">
                  <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
                    Компетенции
                  </Label.Root>
                  <CompetenciesSelect
                    value={values.competencies}
                    onChange={(value) => updateField("competencies", value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex justify-end gap-1 px-4 pb-5 pt-0 flex-shrink-0 w-full">
            <Button
              type="button"
              variant="plain"
              onClick={() => onOpenChange(false)}
              className="w-[105px] h-[32px] border border-purple-500 bg-white text-xs text-purple-500 hover:bg-purple-50 rounded-md"
            >
              Отменить
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-[165px] h-[32px] text-xs tracking-[-0.5px] bg-purple-500 hover:bg-purple-600 text-white rounded-md"
            >
              {isSubmitting ? "Создание..." : "Создать карточку"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
