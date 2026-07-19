import type {
  TEmployee,
  EmployeeData,
  EmployeeShortResponse,
  EmployeeDetailAdminResponse,
  EmployeeDetailPublicResponse,
  TTag,
} from "../model/types";

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
  status: employee.employment_status || "working",
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
    status: data.employment_status || "working",
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

    department: String(data.department_id),
    franchise: data.direction_name ?? "",
    status: data.employment_status || "working",
    photo: data.photo_url ?? undefined,

    city: data.city ?? "",

    // 👇 руководитель
    linearManager:
      data.supervisor_name ??
      data.supervisor_detail?.full_name ??
      "",

    supervisor: data.supervisor_detail
      ? {
          name: data.supervisor_detail.full_name,
          position: data.supervisor_detail.job_title,
          photo: data.supervisor_detail.photo_url ?? undefined,
        }
      : undefined,

    supervisorId:
      data.supervisor_id != null
        ? String(data.supervisor_id)
        : data.supervisor_detail
          ? String(data.supervisor_detail.id)
          : "",

    // 👇 контакты
    emailCorporate: data.email ?? undefined,
    phoneCorporate: data.phone ?? undefined,

    // 👇 дата
    birthday: data.birthday,

    // 👇 компетенции
    competencies: data.tags?.map((t: TTag) => t.name) ?? [],

    // 👇 роли / описание роли
    //roles: data.role_description ?? [],
    role: data.role_description?.join(", ") ?? "",

    // 👇 доп поля
    socialNetwork: data.social_network ?? undefined,
    resumeLink: data.resume_link ?? undefined,
    crmProfile: data.crm_profile ?? undefined,

    aboutMe: data.interests ?? undefined,

    // 👇 пока нет в API — оставляем как есть
    emailPersonal: undefined,
    phonePersonal: undefined,

    // 👇 архив (если появится статус — можно расширить)
    isArchived: false,
  };
};