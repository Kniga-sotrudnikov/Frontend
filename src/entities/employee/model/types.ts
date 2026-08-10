export type TEmployeeStatus =
  | "working"
  | "remote"
  | "vacation"
  | "sick_leave"
  | "maternity_leave"
  | "business_trip";

export type TEmployee = {
  id: number;
  full_name: string;
  job_title: string;
  department_name: string;
  direction_name: string;
  photo_url: string;
  status: StatusEnum;
  employment_status: TEmployeeStatus;
  employment_status_display: string;
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
  status: TEmployeeStatus;
  photo?: string;
  isArchived?: boolean;
  emailCorporate?: string;
  emailPersonal?: string;
  phoneCorporate?: string;
  phonePersonal?: string;
  birthday?: string;
  competencies?: string[];
  tags?: string[];
  roles?: string[];
  supervisor?: EmployeeSupervisor;
  supervisorId?: string;
  socialNetwork?: string;
  resumeLink?: string;
  crmProfile?: string;
  aboutMe?: string;
  role?: string;
}

export type StatusEnum = "active" | "archived";

export type TTag = {
  id: number;
  name: string;
};

export interface BaseEmployeeRequestResponse {
  full_name: string;
  job_title: string;
  role_description?: string[];

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

  employment_status?: TEmployeeStatus;

  crm_profile?: string | null;
  social_network?: string | null;
  resume_link?: string | null;
}

export interface CreateEmployeeRequest extends BaseEmployeeRequestResponse {
  tags?: string[];
}

export interface CreateEmployeeResponse extends BaseEmployeeRequestResponse {
  id: number; //TODO: сообщить бекенду, чтобы включить поле id в ответе
}

export type PatchEmployeeRequest = Partial<CreateEmployeeRequest>;

export interface PatchEmployeeResponse extends BaseEmployeeRequestResponse {
  id: number; //TODO: сообщить бекенду, чтобы включить поле id в ответе
}

export interface EmployeeShortResponse {
  competencies?: string[];
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

  employment_status: TEmployeeStatus;
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

// Тип данных query-параметров для списка сотрудников
export interface EmployeesListFilter {
  direction_id?: number;
  department_id?: number;
  direction?: boolean;
  search?: string;
  employment_status?: TEmployeeStatus[];
}

export interface SupervisorDetail {
  id: number;
  full_name: string;
  job_title: string;
  photo_url: string | null;
  department_name: string;
  department_id: number;
}

export interface EmployeeDetailAdminResponse {
  id: number;

  full_name: string;
  job_title: string;

  department_name: string;
  direction_name: string | null;

  photo_url: string | null;
  photo_original_url: string | null;

  status: StatusEnum;

  birthday_display: string | null;
  birthday: string;

  tags: TTag[];

  city: string | null;

  employment_status: TEmployeeStatus;
  employment_status_display: string;

  supervisor_name: string | null;
  supervisor_id: number | null;
  supervisor_detail: SupervisorDetail | null;
  supervisor_photo_url: string | null;

  // ⚠️ поле нестабильное (иногда отсутствует)
  supervisor_role_name?: string | null;

  email: string;
  phone: string;

  personal_email: string | null;
  personal_phone: string | null;

  interests: string;

  role_description: string[];

  department: number;
  department_id: number;

  crm_profile: string | null;
  social_network: string | null;
  resume_link: string | null;

  created_at: string;
  updated_at: string;
}

export type EmployeeDetailPublicResponse = EmployeeDetailAdminResponse;

export interface BirthdayPerson {
  name: string;
  date: string;
  fullDate: Date;
}

export type BulkEmployeeAction =
  | "archive"
  | "add_tag"
  | "remove_tag"
  | "change_department";

export interface BulkEmployeeActionRequest {
  employee_ids: number[];
  action: BulkEmployeeAction;
  params?: {
    tag?: number;
    department_id?: number;
  };
}

export interface BulkEmployeeActionError {
  employee_id: number;
  error: string;
}

export interface BulkEmployeeActionResponse {
  total: number;
  success: number;
  failed: number;
  details: BulkEmployeeActionError[];
}
