export type UserRole = "employee" | "hr_admin";

export type CurrentUser = {
  id: number;
  email: string;
  role: UserRole;
  employee_id: number | null;
};
