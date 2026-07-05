/**
 * Устаревший тип статуса, вместо него следует использовать `EmploymentStatus`
 */
//export type TEmployeeStatus = "active" | "vacation" | "sick" | "maternity";

export type TEmployeeStatus =
  | "working"
  | "vacation"
  | "sick_leave"
  /* | "maternity_leave" */
  | "business_trip"
 /*  | "remote" */;

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
  status: TEmployeeStatus;
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
// {
//     "id": 37,
//     "full_name": "04 тест 14",
//     "job_title": "тест 14",
//     "department_name": "Корневая соц. практика",
//     "direction_name": "Трудоустройство",
//     "photo_url": null,
//     "status": "active",
//     "birthday_display": "3 июля",
//     "tags": [],
//     "city": "Москва",
//     "employment_status": "sick_leave",
//     "employment_status_display": "На больничном",
//     "supervisor_name": null,
//     "supervisor_id": null,
//     "email": "testcorp14@test.test",
//     "phone": "+7 (843) 345-67-89",
//     "interests": "urhgiusergius",
//     "birthday": "2020-07-03",
//     "role_description": [
//         "рандомная роль 1",
//         "рандомная роль 2"
//     ],
//     "department": 9,
//     "department_id": 9,
//     "crm_profile": "https://employeebook.rassokha.pro/crm",
//     "social_network": "https://employeebook.rassokha.pro/social",
//     "resume_link": "https://employeebook.rassokha.pro/resume",
//     "supervisor_detail": null,
//     "supervisor_photo_url": null,
//     "photo_original_url": null,
//     "created_at": "2026-07-04T23:16:07.428074Z",
//     "updated_at": "2026-07-04T23:16:07.428094Z",
//     "created_by": 1
// }
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

  employment_status: TEmployeeStatus;
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
