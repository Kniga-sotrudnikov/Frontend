import type { TEmployeeStatus } from "@/entities/employee";

export type CreateEmployeeFormValues = {
  photo?: File | string;
  fullName: string;
  position: string;
  department: string;
  leader: string;
  emailCorporate: string;
  emailPersonal: string;
  phoneCorporate: string;
  phonePersonal: string;
  birthday: Date | undefined;
  city: string;
  status: TEmployeeStatus;
  competencies: string[];
  resumeLink: string;
  crmProfileLink: string;
  socialNetworkLink: string;
  aboutMe: string;
  role: string;
};

export type CompetencyOption = {
  id: string;
  label: string;
};
