import type { EmployeeData } from "@/entities/employee";
import type { NormalizedVacancy } from "@/entities/vacancy";

export type EmployeesListTab =
  | "employees"
  | "vacancies"
  | "favorites"
  | "archive";

export type EmployeesListEntityTab = "employees" | "vacancies";

export type EmployeesListType = EmployeeData | NormalizedVacancy;
