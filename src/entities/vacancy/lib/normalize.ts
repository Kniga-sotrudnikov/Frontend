import type { Vacancy, VacancyDetail } from "../model/types";
import defaultPhoto from "@/shared/assets/images/avatar-placeholder.jpg";

export interface NormalizedVacancy {
  id: number;
  city: string;
  photo: string;
  profession: string;
  position: string;
  franchise: string;
  department: string;
  isArchived: boolean;
}

export interface NormalizedVacancyDetail {
  id: number;
  title: string;
  department: string;
  description: string;
  status: "open" | "closed";
  location: string;
  franchise: string;
  employmentDetails: string[];
  responsibilities: string[];
  competencies: string[];
}

export function normalizeVacancy(vacancy: Vacancy): NormalizedVacancy {
  return {
    id: vacancy.id,
    city: vacancy.city || "Город не указан",
    photo: vacancy.photo || defaultPhoto,
    profession: vacancy.title || "Не указана",
    position: vacancy.position || "Не указана",
    franchise: vacancy.franchise || "Франшиза не указана",
    department: vacancy.department_name || "Не указан",
    isArchived: vacancy.status === "closed",
  };
}

export function normalizeVacancies(vacancies: Vacancy[]): NormalizedVacancy[] {
  return vacancies.map(normalizeVacancy);
}

export function normalizeVacancyDetail(
  detail: VacancyDetail,
): NormalizedVacancyDetail {
  return {
    id: detail.id,
    title: detail.title,
    department: detail.department.name || "Не указан",
    description: detail.description || "",
    status: detail.status,
    location: detail.location || "Город не указан",
    franchise: detail.franchise || "Франшиза не указана",
    employmentDetails: detail.employmentDetails || [],
    responsibilities: detail.responsibilities || [],
    competencies: detail.competencies || [],
  };
}
