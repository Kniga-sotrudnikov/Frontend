import type { EmployeeData } from "@/entities/employee";
import type { CreateEmployeeFormValues } from "../model/types";

const mapStatus = (
  status: EmployeeData["status"],
): CreateEmployeeFormValues["status"] => {
  switch (status) {
    case "working":
      return "active";
    case "vacation":
      return "vacation";
    case "bizTrip":
      return "active";
    case "sick":
      return "sick";
    default:
      return "active";
  }
};

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
  status: mapStatus(employee.status),
  competencies: employee.competencies || [],
});
