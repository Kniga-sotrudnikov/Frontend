export interface OrgUnit  {
    name: string;
    employeeCount?: number;
    items?: OrgUnit[];
}