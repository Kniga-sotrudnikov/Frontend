import type { CurrentUser } from "./types";

// TODO: заменить на useCurrentUserQuery() после подключения GET /auth/me/
export const mockCurrentUser: CurrentUser = {
  id: 1,
  email: "admin@example.com",
  role: "hr_admin",
  employee_id: null,
};
