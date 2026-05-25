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
};

export type CompetencyOption = {
  id: string;
  label: string;
};

export const COMPETENCY_OPTIONS: CompetencyOption[] = [
  { id: "alumni", label: "Alumni статус X" },
  { id: "author", label: "Автор методических материалов" },
  { id: "mentor", label: "Наставник" },
  { id: "expert", label: "Эксперт" },
  { id: "speaker", label: "Спикер" },
  { id: "teamlead", label: "Teamlead" },
];