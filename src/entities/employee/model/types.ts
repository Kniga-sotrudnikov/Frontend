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
  birthday?: string | Date;
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
  birthday?: string | Date;
  competencies?: string[];
  roles?: string[];
  supervisor?: EmployeeSupervisor;
  socialNetwork?: string;
  resumeLink?: string;
  crmProfile?: string;
  aboutMe?: string;
  role?: string;
}
