import type { TEmployee, EmployeeData, EmployeeStatus } from "../model/types";

const mapStatus = (status: TEmployee["status"]): EmployeeStatus => {
  switch (status) {
    case "active":
      return "working";
    case "vacation":
      return "vacation";
    case "sick":
      return "sick";
    default:
      return "working";
  }
};

export const mapTEmployeeToEmployeeData = (
  employee: TEmployee,
): EmployeeData => ({
  id: employee.id,
  city: employee.city,
  linearManager: employee.linear_manager || "",
  name: employee.full_name,
  position: employee.job_title,
  franchise: employee.direction_name,
  department: employee.department_name,
  status: mapStatus(employee.status),
  photo: employee.photo_url,
  isArchived: false,
  emailCorporate: employee.email_corporate,
  emailPersonal: employee.email_personal,
  phoneCorporate: employee.phone_corporate,
  phonePersonal: employee.phone_personal,
  birthday: employee.birthday,
  competencies: employee.competencies,
});
