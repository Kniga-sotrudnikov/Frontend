import type { EmployeeData } from "@/entities/employee";
import type { CreateEmployeeFormValues } from "../model/types";

const parseDate = (date?: string | Date): Date | undefined => {
  if (!date) return undefined;
  if (date instanceof Date) return date;
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? undefined : parsed;
};

export const mapEmployeeToFormValues = (
  employee: EmployeeData,
): CreateEmployeeFormValues => ({
  photo: employee.photo,
  fullName: employee.name,
  position: employee.position,
  department: employee.department,
  leader: employee.linearManager,
  emailCorporate: employee.emailCorporate || "",
  emailPersonal: employee.emailPersonal || "",
  phoneCorporate: employee.phoneCorporate || "",
  phonePersonal: employee.phonePersonal || "",
  birthday: parseDate(employee.birthday),
  city: employee.city,
  status: employee.status,
  competencies: (employee.competencies || []).map(String),
 // Новые поля - требуют уточнения у бэкенда о наличии этих полей в API
  resumeLink: employee.resumeLink ?? "",
  crmProfileLink: employee.crmProfile ?? "",
  socialNetworkLink: employee.socialNetwork ?? "",
  aboutMe: employee.aboutMe ?? "",
  role: employee.role ?? "",
});
