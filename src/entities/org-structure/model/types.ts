export interface OrgUnit {
  id?: number;
  name: string;
  head?: boolean;
  employeeCount?: number;
  items?: OrgUnit[];
}

export interface DepartmentCreateDTO {
  name: string;
  type: 'direction' | 'sis' | 'department';
  display_order?: number;
  parent?: number | null;
  description?: string;
  short_name?: string;
}

export interface DepartmentUpdateDTO {
  name?: string;
  type?: 'direction' | 'sis' | 'department';
  display_order?: number;
  parent?: number | null;
  description?: string;
  short_name?: string;
  is_active?: boolean;
}

export interface DepartmentResponse {
  id: number;
  name: string;
  short_name: string | null;
  description: string | null;
  type: 'direction' | 'sis' | 'department';
  parent: number | null;
  display_order: number;
  is_active: boolean;
  employee_count: number;
  children?: DepartmentResponse[];
}

export interface DirectionFormValues {
  name: string;
  short_name?: string;
  description: string;
  type: 'direction' | 'sis';
  parent?: number | null;
  display_order?: number;
}

export interface DepartmentBrief {
  id: number;
  name: string;
  type: 'direction' | 'department';
  display_order?: number;
  employee_count: number;
}

export interface PaginatedDepartmentBrief {
  count: number;
  next: string | null;
  previous: string | null;
  results: DepartmentBrief[];
}

export interface DepartmentListParams {
  limit?: number;
  offset?: number;
}