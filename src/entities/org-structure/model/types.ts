export interface OrgUnit {
  name: string;
  head?: boolean;
  employeeCount?: number;
  items?: OrgUnit[];
}
