import * as Label from "@radix-ui/react-label";
import { FormInput } from "./form-input";
import { Calendar } from "@ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Button } from "@ui/button";
import { cn } from "@/shared/lib";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import CalendarIcon from "@/shared/assets/icons/calendar.svg?react";
import type { TEmployeeStatus } from "@/entities/employee";
import { PhotoUpload } from "./photo-upload";
import { CompetenciesSelect } from "./competencies-select";
import { FormSelect } from "./form-select";
import {
  DEPARTMENT_OPTIONS,
  LEADER_OPTIONS,
  CITY_OPTIONS,
} from "../model/constants";
import type { CreateEmployeeFormValues } from "../model/types";
import type { ValidationErrors } from "../model/validation";

const statusOptions = [
  { value: "active", label: "В работе" },
  { value: "vacation", label: "В отпуске" },
  { value: "sick", label: "На больничном" },
  { value: "maternity", label: "В декрете" },
];

const minDate = new Date(1950, 0, 1);
const maxDate = new Date(new Date().getFullYear() + 10, 11, 31);

interface EmployeeFormProps {
  values: CreateEmployeeFormValues;
  errors: ValidationErrors;
  onUpdate: <K extends keyof CreateEmployeeFormValues>(
    field: K,
    value: CreateEmployeeFormValues[K],
  ) => void;
  calendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
}

export const EmployeeForm = ({
  values,
  errors,
  onUpdate,
  calendarOpen,
  onCalendarOpenChange,
}: EmployeeFormProps) => {
  return (
    <>
      {/* PhotoUpload */}
      <div className="mb-5">
        <PhotoUpload
          value={values.photo}
          onChange={(file) => onUpdate("photo", file)}
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
              onChange={(e) => onUpdate("fullName", e.target.value)}
              placeholder="Иванов Алексей Петрович"
              error={!!errors.fullName}
            />
            {errors.fullName && (
              <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
              Отдел
            </Label.Root>
            <FormSelect
              value={values.department}
              onValueChange={(value) => onUpdate("department", value)}
              options={DEPARTMENT_OPTIONS.map((dept) => ({
                value: dept,
                label: dept,
              }))}
              placeholder="Выберите отдел"
              error={!!errors.department}
            />
            {errors.department && (
              <p className="text-xs text-red-600 mt-1">{errors.department}</p>
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
              onChange={(e) => onUpdate("emailCorporate", e.target.value)}
              placeholder="alexey.ivanov@company.com"
              error={!!errors.emailCorporate}
            />
            {errors.emailCorporate && (
              <p className="text-xs text-red-600 mt-1">{errors.emailCorporate}</p>
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
              onChange={(e) => onUpdate("phoneCorporate", e.target.value)}
              placeholder="+7 (495) 123-45-67"
              error={!!errors.phoneCorporate}
            />
            {errors.phoneCorporate && (
              <p className="text-xs text-red-600 mt-1">{errors.phoneCorporate}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
              День рождения
            </Label.Root>
            <Popover open={calendarOpen} onOpenChange={onCalendarOpenChange}>
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
                    onUpdate("birthday", date);
                    onCalendarOpenChange(false);
                  }}
                  locale={ru}
                  captionLayout="dropdown"
                  startMonth={minDate}
                  endMonth={maxDate}
                />
              </PopoverContent>
            </Popover>
            {errors.birthday && (
              <p className="text-xs text-red-600 mt-1">{errors.birthday}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
              Статус
            </Label.Root>
            <FormSelect
              value={values.status}
              onValueChange={(value) => onUpdate("status", value as TEmployeeStatus)}
              options={statusOptions}
              placeholder="Выберите статус"
            />
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
              onChange={(e) => onUpdate("position", e.target.value)}
              placeholder="Менеджер по карьерному развитию"
              error={!!errors.position}
            />
            {errors.position && (
              <p className="text-xs text-red-600 mt-1">{errors.position}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
              Руководитель
            </Label.Root>
            <FormSelect
              value={values.leader}
              onValueChange={(value) => onUpdate("leader", value)}
              options={LEADER_OPTIONS.map((leader) => ({
                value: leader,
                label: leader,
              }))}
              placeholder="Выберите руководителя"
            />
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
              onChange={(e) => onUpdate("emailPersonal", e.target.value)}
              placeholder="alexey.ivanov@gmail.com"
              error={!!errors.emailPersonal}
            />
            {errors.emailPersonal && (
              <p className="text-xs text-red-600 mt-1">{errors.emailPersonal}</p>
            )}
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
              onChange={(e) => onUpdate("phonePersonal", e.target.value)}
              placeholder="+7 (000) 000-00-00"
              error={!!errors.phonePersonal}
            />
            {errors.phonePersonal && (
              <p className="text-xs text-red-600 mt-1">{errors.phonePersonal}</p>
            )}
          </div>

          <div className="space-y-2 -mb-2">
            <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
              Город
            </Label.Root>
            <FormSelect
              value={values.city}
              onValueChange={(value) => onUpdate("city", value)}
              options={CITY_OPTIONS.map((city) => ({ value: city, label: city }))}
              placeholder="Выберите город"
              error={!!errors.city}
            />
            {errors.city && (
              <p className="text-xs text-red-600 mt-1">{errors.city}</p>
            )}
          </div>

          {/* Компетенции */}
          <div className="space-y-2">
            <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
              Компетенции
            </Label.Root>
            <CompetenciesSelect
              value={values.competencies}
              onChange={(value) => onUpdate("competencies", value)}
              error={errors.competencies}
            />
          </div>
        </div>
      </div>
    </>
  );
};