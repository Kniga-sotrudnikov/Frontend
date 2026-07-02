export interface Department {
  id: number;
  name: string;
  short_name: string;
  description: string;
  type: "direction" | "department" | "team";
  parent: number | null;
  display_order: number;
  is_active: boolean;
  children: Department[];
}

export interface Vacancy {
  id: number;
  title: string;
  department_name: string;
  status: "open" | "closed";
  created_at: string;
  photo?: string;
  city?: string;
  position?: string;
  franchise?: string;
}

export interface VacancyDetail {
  id: number;
  title: string;
  department: Department;
  description: string;
  status: "open" | "closed";
  created_at: string;
  updated_at: string;
  location?: string;
  franchise?: string;
  employmentDetails?: string[];
  responsibilities?: string[];
  competencies?: string[];
}

export interface VacanciesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Vacancy[];
}

export type VacancyDetailResponse = VacancyDetail;
