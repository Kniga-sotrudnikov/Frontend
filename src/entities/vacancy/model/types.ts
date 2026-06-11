export interface VacancyData {
  id: number | string;
  city: string;
  profession: string;
  position: string;
  franchise: string;
  department: string;
  isArchived?: boolean;
}
