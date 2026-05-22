export interface EmployeeData {
  id: number | string;
  city: string;
  linearManager: string;
  name: string;
  position: string;
  franchise: string;
  department: string;
  status: "working" | "bizTrip" | "vacation" | "sick";
  photo?: string;
  isArchived?: boolean;
}

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
