import type { EmployeeData } from "@/entities/employee";
import type { CreateEmployeeFormValues } from "@/features/create-employee";

export const mapEmployeeToForm = (
  employee: EmployeeData,
): CreateEmployeeFormValues => ({
  photo: employee.photo,
  fullName: employee.name,
  position: employee.position,
  department: employee.department,
  leader: employee.linearManager,
  emailCorporate: employee.emailCorporate ?? "",
  emailPersonal: employee.emailPersonal ?? "",
  phoneCorporate: employee.phoneCorporate ?? "",
  phonePersonal: employee.phonePersonal ?? "",
  birthday: employee.birthday ? new Date(employee.birthday) : undefined,
  city: employee.city,
  status: employee.status,
  competencies: employee.competencies ?? [],
  resumeLink: employee.resumeLink ?? "",
  crmProfileLink: employee.crmProfile ?? "",
  socialNetworkLink: employee.socialNetwork ?? "",
  aboutMe: employee.aboutMe ?? "",
  role: employee.role ?? "",
});