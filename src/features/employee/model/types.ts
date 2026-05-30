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

export type ViewType = "grid" | "list";
export type EmployeeFilterValue = "all" | "active" | "vacation" | "sick" | "maternity";