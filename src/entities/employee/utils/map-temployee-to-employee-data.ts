import type {
  TEmployee,
  EmployeeData,
  EmployeeStatus,
  EmployeeShortResponse,
  EmployeeDetailAdminResponse,
  EmployeeDetailPublicResponse,
  EmploymentStatus,
  TTag,
} from "../model/types";

export const mapStatus = (employmentStatus: EmploymentStatus): EmployeeStatus => {
  switch (employmentStatus) {
    case "working":
      return "working";
    case "vacation":
      return "vacation";
    case "sick_leave":
      return "sick";
    case "maternity_leave":
      return "maternity";
    case "business_trip":
      return "bizTrip";
    case "remote":
      return "working";
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
  status: mapStatus(employee.employment_status || "working"),
  photo: employee.photo_url,
  isArchived: false,
  emailCorporate: employee.email_corporate,
  emailPersonal: employee.email_personal,
  phoneCorporate: employee.phone_corporate,
  phonePersonal: employee.phone_personal,
  birthday: employee.birthday,
  competencies: employee.competencies,
});

export const mapEmployeeListResponse = (
  data: EmployeeShortResponse,
): EmployeeData => {
  return {
    id: data.id,
    name: data.full_name,
    position: data.job_title,
    department: data.department_name,
    franchise: data.direction_name ?? "",
    status: mapStatus(data.employment_status || "working"),
    photo: data.photo_url ?? undefined,
    city: "",
    linearManager: "",
    isArchived: false,
    emailCorporate: undefined,
    emailPersonal: undefined,
    phoneCorporate: undefined,
    phonePersonal: undefined,
    birthday: undefined,
    competencies: data.tags?.map((t: TTag) => t.name) ?? [],
  };
};

export const mapEmployeeDetail = (
  data: EmployeeDetailAdminResponse | EmployeeDetailPublicResponse,
): EmployeeData => {
  return {
    id: data.id,
    name: data.full_name,
    position: data.job_title,
    department: data.department_name,
    franchise: data.direction_name ?? "",
    status: mapStatus(data.employment_status || "working"),
    photo: data.photo_url ?? undefined,
    city: "",
    linearManager: "",
    isArchived: false,
    emailCorporate: data.email,
    emailPersonal: undefined,
    phoneCorporate: data.phone,
    phonePersonal: undefined,
    birthday: data.birthday,
    competencies: data.tags?.map((t: TTag) => t.name) ?? [],
  };
};