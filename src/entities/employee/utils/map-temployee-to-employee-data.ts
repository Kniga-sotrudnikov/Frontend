import type {
  TEmployee,
  EmployeeData,
  EmployeeStatus,
  EmployeeShortResponse,
  EmployeeDetailAdminResponse,
  EmployeeDetailPublicResponse,
} from "../model/types";

const mapStatus = (status: TEmployee["status"]): EmployeeStatus => {
  switch (status) {
    case "working":
      return "working";
    case "vacation":
      return "vacation";
    case "sick_leave":
      return "sick";
    case "business_trip":
      return "bizTrip"
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

export const mapEmployeeListResponse = (
  data: EmployeeShortResponse,
): EmployeeData => {
  return {
    id: data.id,
    name: data.full_name,
    position: data.job_title,
    department: data.department_name,
    franchise: data.direction_name ?? "",
    status: "working" as EmployeeStatus,
    photo: data.photo_url ?? undefined,
    city: "",
    linearManager: "",
    isArchived: false,
    emailCorporate: undefined,
    emailPersonal: undefined,
    phoneCorporate: undefined,
    phonePersonal: undefined,
    birthday: undefined,
    competencies: data.tags?.map((t) => t.name) ?? [],
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
    status: "working" as EmployeeStatus,
    photo: data.photo_url ?? undefined,
    city: "",
    linearManager: "",
    isArchived: false,
    emailCorporate: data.email,
    emailPersonal: undefined,
    phoneCorporate: data.phone,
    phonePersonal: undefined,
    birthday: data.birthday,
    competencies: data.tags.map((t) => t.name),
  };
};
