export type TExpertiseFilterOption = {
  value: string;
  label: string;
};

export type TExpertiseFilterGroup = {
  key: string;
  title: string;
  options: TExpertiseFilterOption[];
};

export type TExpertiseFilterValue = Record<string, string[]>;

export type TCitiesFilterOption = {
  value: string;
  label: string;
};

export type ViewType = "grid" | "list";
export type EmployeeFilterValue =
  | "all"
  | "active"
  | "vacation"
  | "sick"
  | "maternity";

export interface TTagWithDetails {
  id: number;
  name: string;
  employee_count?: number;
  employees?: Array<{
    id: number;
    full_name: string;
    job_title: string;
    photo_url?: string | null;
  }>;
}

export interface TTagEmployee {
  id: string;
  name: string;
  position: string;
  photo?: string;
}
