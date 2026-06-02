import type { EmployeeData } from "@/entities/employee";

export type { EmployeeData };

export interface VacancyData {
  id: number | string;
  city: string;
  profession: string;
  position: string;
  franchise: string;
  department: string;
  isArchived?: boolean;
}

export type EmployeesListType = EmployeeData | VacancyData;