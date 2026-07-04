/**
 * Устаревший тип статуса, вместо него следует использовать `EmploymentStatus`
 */
export type TEmployeeStatus = "active" | "vacation" | "sick" | "maternity";

export type TEmployee = {
  id: number;
  full_name: string;
  job_title: string;
  department_name: string;
  direction_name: string;
  photo_url: string;
  status: TEmployeeStatus;
  birthday_display: string;
  city: string;
  tags: string[];
  email_corporate?: string;
  email_personal?: string;
  phone_corporate?: string;
  phone_personal?: string;
  birthday?: string;
  competencies?: string[];
  linear_manager?: string;
};

export type TShortEmployee = {
  id: number;
  name: string;
  job: string;
  photo: string;
};

export type EmployeeStatus = "working" | "bizTrip" | "vacation" | "sick";

export interface EmployeeSupervisor {
  name: string;
  position: string;
  photo?: string;
}

export interface EmployeeData {
  id: number | string;
  city: string;
  linearManager: string;
  name: string;
  position: string;
  franchise: string;
  department: string;
  status: EmployeeStatus;
  photo?: string;
  isArchived?: boolean;
  emailCorporate?: string;
  emailPersonal?: string;
  phoneCorporate?: string;
  phonePersonal?: string;
  birthday?: string;
  competencies?: string[];
  roles?: string[];
  supervisor?: EmployeeSupervisor;
  socialNetwork?: string;
  resumeLink?: string;
  crmProfile?: string;
  aboutMe?: string;
  role?: string;
}

export type EmploymentStatus =
  | "working"
  | "vacation"
  | "sick_leave"
  | "maternity_leave"
  | "business_trip"
  | "remote";

export type StatusEnum = "active" | "archived";

export type TTag = {
  id: number;
  name: string;
};

export interface BaseEmployeeRequestResponse {
  full_name: string;
  job_title: string;
  role_description?: string;

  email: string;
  phone?: string;

  personal_phone?: string | null;
  personal_email?: string | null;

  interests?: string;

  birthday: string;

  user?: number | null;
  department: number;

  supervisor?: number | null;
  supervisor_role?: number | null;
  supervisor_photo?: number | null;

  city?: string | null;

  employment_status?: EmploymentStatus;

  crm_profile?: string | null;
  social_network?: string | null;
  resume_link?: string | null;
}

export interface CreateEmployeeRequest extends BaseEmployeeRequestResponse {
  tags?: number[];
}

export interface CreateEmployeeResponse extends BaseEmployeeRequestResponse {
  id: number; //TODO: сообщить бекенду, чтобы включить поле id в ответе
}

export type PatchEmployeeRequest = Partial<CreateEmployeeRequest>;

export interface PatchEmployeeResponse extends BaseEmployeeRequestResponse {
  id: number; //TODO: сообщить бекенду, чтобы включить поле id в ответе
}

export interface EmployeeShortResponse {
  id: number;

  full_name: string;
  job_title: string;

  department_name: string;
  direction_name: string | null;

  photo_url: string | null;

  status: StatusEnum;

  birthday_display: string | null;

  tags: TTag[];

  city: string | null;

  employment_status: EmploymentStatus;
  employment_status_display: string;

  supervisor_name: string | null;
  supervisor_id: number | null;
}

export interface EmployeesListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: EmployeeShortResponse[];
}

export interface EmployeesListFilter {
  direction_id?: number;
  department_id?: number;
  direction?: boolean;
}

interface BaseEmployeeDetail {
  id: number;

  full_name: string;
  job_title: string;

  department_name: string;
  direction_name: string | null;

  photo_url: string | null;

  status: StatusEnum;

  birthday_display: string | null;

  tags: TTag[];

  city: string | null;

  employment_status: EmploymentStatus;
  employment_status_display: string;

  supervisor_name: string | null;
  supervisor_id: number | null;

  email: string;
  phone: string;

  interests: string;

  birthday: string;

  /**
   * ❗ неизвестный формат с бэка (в сваггере string, по факту объект)
   */
  role_description: unknown;

  department: number;

  /**
   * ❗ нет в сваггере
   */
  department_id: number;

  /**
   * ❗ нет в сваггере
   */
  crm_profile: string | null;

  /**
   * ❗ нет в сваггере
   */
  social_network: string | null;

  /**
   * ❗ нет в сваггере
   */
  resume_link: string | null;

  /**
   * ❗ нет в сваггере
   */
  supervisor_detail: unknown | null;

  /**
   * ❗ нет в сваггере
   */
  supervisor_photo_url: string | null;

  /**
   * ❗ нет в сваггере
   */
  photo_original_url: string | null;

  created_at: string;
  updated_at: string;
}

export type EmployeeDetailAdminResponse = BaseEmployeeDetail;

export type EmployeeDetailPublicResponse = BaseEmployeeDetail;
