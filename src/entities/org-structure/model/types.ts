export interface OrgUnit {
  id?: number;
  name: string;
  head?: boolean;
  employeeCount?: number;
  items?: OrgUnit[];
}