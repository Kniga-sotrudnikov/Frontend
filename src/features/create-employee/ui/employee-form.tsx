import { memo, type RefObject } from "react";
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
import type { CreateEmployeeFormValues } from "../model/types";
import type { ValidationErrors } from "../model/validation";
import { useDepartmentsList } from "@/entities/org-structure/api/use-department-list";

/* const statusOptions = [
  { value: "active", label: "В работе" },
  { value: "vacation", label: "В отпуске" },
  { value: "sick", label: "На больничном" },
  { value: "maternity", label: "В декрете" },
]; */

const statusOptions = [
  {value: "working", label: "В работе"},
  {value: "vacation", label: "В отпуске"},
  {value: "sick_leave", label: "На больничном"},
  {value: "business_trip", label: "В командировке"},
] satisfies {value: TEmployeeStatus; label: string}[];

const minDate = new Date(1950, 0, 1);
const maxDate = new Date(new Date().getFullYear() + 10, 11, 31);

interface EmployeeFormProps {
  values: CreateEmployeeFormValues;
  errors: ValidationErrors;
  onUpdate: <K extends keyof CreateEmployeeFormValues>(
    field: K,
    value: CreateEmployeeFormValues[K],
  ) => void;
  onBlur: (field: keyof CreateEmployeeFormValues) => void;
  calendarOpen: boolean;
  onCalendarOpenChange: (open: boolean) => void;
  touchedFields: Set<keyof CreateEmployeeFormValues>;
  firstInputRef?: RefObject<HTMLInputElement>;
}

export const EmployeeForm = memo(function EmployeeForm({
  values,
  errors,
  onUpdate,
  onBlur,
  calendarOpen,
  onCalendarOpenChange,
  touchedFields,
  firstInputRef,
}: EmployeeFormProps) {
  const showError = (field: keyof CreateEmployeeFormValues) => {
    return touchedFields.has(field) && errors[field];
  };

  const RequiredMark = () => <span className="text-red-600 ml-0.5">*</span>;

  const { data } = useDepartmentsList();

  const departmentOptions =
    data?.results
      ?.filter((dep) => dep.type === "department")
      ?.map((dep) => ({
        value: dep.id.toString(),
        label: dep.name,
      })) ?? [];

  return (
    <>
      <div className="mb-5" data-photo-upload>
        <PhotoUpload
          value={values.photo}
          onChange={(file) => onUpdate("photo", file)}
          error={showError("photo") ? errors.photo : undefined}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-3">
        <div className="flex flex-col gap-2">
          <div className="space-y-2">
            <Label.Root
              htmlFor="fullName"
              className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
            >
              Полное имя <RequiredMark />
            </Label.Root>
            <FormInput
              id="fullName"
              ref={firstInputRef}
              value={values.fullName}
              onChange={(e) => onUpdate("fullName", e.target.value)}
              onBlur={() => onBlur("fullName")}
              placeholder="Иванов Алексей Петрович"
              error={!!showError("fullName")}
            />
            {showError("fullName") && (
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
              options={departmentOptions}
              placeholder="Выберите отдел"
              error={!!showError("department")}
            />
            {showError("department") && (
              <p className="text-xs text-red-600 mt-1">{errors.department}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label.Root
              htmlFor="emailCorporate"
              className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
            >
              Электронная почта (корпоративная) <RequiredMark />
            </Label.Root>
            <FormInput
              id="emailCorporate"
              type="email"
              value={values.emailCorporate}
              onChange={(e) => onUpdate("emailCorporate", e.target.value)}
              onBlur={() => onBlur("emailCorporate")}
              placeholder="alexey.ivanov@company.com"
              error={!!showError("emailCorporate")}
            />
            {showError("emailCorporate") && (
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
              onChange={(e) => onUpdate("phoneCorporate", e.target.value)}
              onBlur={() => onBlur("phoneCorporate")}
              placeholder="+7 (495) 123-45-67"
              error={!!showError("phoneCorporate")}
            />
            {showError("phoneCorporate") && (
              <p className="text-xs text-red-600 mt-1">
                {errors.phoneCorporate}
              </p>
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
                    "w-full justify-between text-left font-normal h-8 text-xs mt-1",
                    !values.birthday && "text-muted-foreground",
                    showError("birthday") && "border-red-600",
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
            {showError("birthday") && (
              <p className="text-xs text-red-600 mt-1">{errors.birthday}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
              Статус
            </Label.Root>
            <FormSelect
              value={values.status}
              onValueChange={(value) =>
                onUpdate("status", value as TEmployeeStatus)
              }
              options={statusOptions}
              placeholder="Выберите статус"
            />
          </div>

          <div className="space-y-2">
            <Label.Root
              htmlFor="resumeLink"
              className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
            >
              Ссылка на резюме
            </Label.Root>
            <FormInput
              id="resumeLink"
              type="url"
              value={values.resumeLink}
              onChange={(e) => onUpdate("resumeLink", e.target.value)}
              onBlur={() => onBlur("resumeLink")}
              placeholder="https://example.com/resume"
              error={!!showError("resumeLink")}
            />
            {showError("resumeLink") && (
              <p className="text-xs text-red-600 mt-1">{errors.resumeLink}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label.Root
              htmlFor="socialNetworkLink"
              className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
            >
              Ссылка на социальную сеть
            </Label.Root>
            <FormInput
              id="socialNetworkLink"
              type="url"
              value={values.socialNetworkLink}
              onChange={(e) => onUpdate("socialNetworkLink", e.target.value)}
              onBlur={() => onBlur("socialNetworkLink")}
              placeholder="https://t.me/username"
              error={!!showError("socialNetworkLink")}
            />
            {showError("socialNetworkLink") && (
              <p className="text-xs text-red-600 mt-1">
                {errors.socialNetworkLink}
              </p>
            )}
          </div>
        </div>

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
              onBlur={() => onBlur("position")}
              placeholder="Менеджер по карьерному развитию"
              error={!!showError("position")}
            />
            {showError("position") && (
              <p className="text-xs text-red-600 mt-1">{errors.position}</p>
            )}
          </div>

          {/* <div className="space-y-2">
            <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
              Руководитель
            </Label.Root>
            <FormSelect
              value={values.leader}
              onValueChange={(value) => onUpdate("leader", value)}
              options={LEADER_OPTIONS.map((leader) => ({
                value: leader.value,
                label: leader.value,
              }))}
              placeholder="Выберите руководителя"
            />
          </div> */}

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
              onBlur={() => onBlur("emailPersonal")}
              placeholder="alexey.ivanov@gmail.com"
              error={!!showError("emailPersonal")}
            />
            {showError("emailPersonal") && (
              <p className="text-xs text-red-600 mt-1">
                {errors.emailPersonal}
              </p>
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
              onBlur={() => onBlur("phonePersonal")}
              placeholder="+7 (000) 000-00-00"
              error={!!showError("phonePersonal")}
            />
            {showError("phonePersonal") && (
              <p className="text-xs text-red-600 mt-1">
                {errors.phonePersonal}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label.Root
              htmlFor="city"
              className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
            >
              Город
            </Label.Root>
            <FormInput
              id="city"
              ref={firstInputRef}
              value={values.city}
              onChange={(e) => onUpdate("city", e.target.value)}
              onBlur={() => onBlur("city")}
              placeholder="Выберите город"
              error={!!showError("city")}
            />
            {showError("city") && (
              <p className="text-xs text-red-600 mt-1">{errors.city}</p>
            )}
          </div>

          <div className="space-y-2 mb-2">
            <Label.Root className="text-xs font-normal text-black leading-5 tracking-[-0.5px]">
              Компетенции
            </Label.Root>
            <CompetenciesSelect
              value={values.competencies}
              onChange={(value) => onUpdate("competencies", value)}
              error={
                showError("competencies") ? errors.competencies : undefined
              }
            />
          </div>

          <div className="space-y-2">
            <Label.Root
              htmlFor="crmProfileLink"
              className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
            >
              Ссылка на профиль CRM
            </Label.Root>
            <FormInput
              id="crmProfileLink"
              type="url"
              value={values.crmProfileLink}
              onChange={(e) => onUpdate("crmProfileLink", e.target.value)}
              onBlur={() => onBlur("crmProfileLink")}
              placeholder="https://crm.example.com/profile"
              error={!!showError("crmProfileLink")}
            />
            {showError("crmProfileLink") && (
              <p className="text-xs text-red-600 mt-1">
                {errors.crmProfileLink}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label.Root
          htmlFor="role"
          className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
        >
          Роль
        </Label.Root>
        <FormInput
          id="role"
          value={values.role}
          onChange={(e) => onUpdate("role", e.target.value)}
          onBlur={() => onBlur("role")}
          placeholder="Например: Руководитель отдела, Менеджер проекта"
          error={!!showError("role")}
        />
        {showError("role") && (
          <p className="text-xs text-red-600 mt-1">{errors.role}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label.Root
          htmlFor="aboutMe"
          className="text-xs font-normal text-black leading-5 tracking-[-0.5px]"
        >
          Обо мне
        </Label.Root>
        <textarea
          id="aboutMe"
          value={values.aboutMe}
          onChange={(e) => onUpdate("aboutMe", e.target.value)}
          onBlur={() => onBlur("aboutMe")}
          placeholder="Расскажите о себе..."
          className={cn(
            "w-full h-24 px-3 py-2 mt-1 text-xs rounded-md border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
            showError("aboutMe") && "border-red-600",
          )}
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-1">
          {showError("aboutMe") && (
            <p className="text-xs text-red-600">{errors.aboutMe}</p>
          )}
          <span className="text-xs text-gray-400 ml-auto">
            {values.aboutMe.length}/500
          </span>
        </div>
      </div>
    </>
  );
});
