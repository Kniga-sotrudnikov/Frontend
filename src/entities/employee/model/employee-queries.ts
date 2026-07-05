import { useQuery } from "@tanstack/react-query";
import {
  getEmployeeDetailAdmin,
  getEmployeeDetailPublic,
  getEmployeesListAdmin,
  getEmployeesListPublic,
  mapEmployeeDetail,
  mapEmployeeListResponse,
} from "@/entities/employee";
import type { UserRole } from "@/entities/user";
import type { EmployeesListFilter } from "@/entities/employee";

export const useEmployeesList = (
  limit = 20,
  offset = 0,
  role: UserRole = "employee",
  filter: EmployeesListFilter = {},
) => {
  return useQuery({
    queryKey: ["employees-list", limit, offset, role, JSON.stringify(filter)],
    queryFn: () => {
      if (role === "hr_admin") {
        return getEmployeesListAdmin({ limit, offset, ...filter });
      }
      return getEmployeesListPublic({ limit, offset, ...filter });
    },
    select: (data) => ({
      ...data,
      results: data.results.map(mapEmployeeListResponse),
    }),
  });
};

export const useEmployeeDetail = (id?: number, role: UserRole = "employee") => {
  return useQuery({
    queryKey: ["employee-detail", id, role],
    queryFn: () => {
      if (role === "hr_admin") {
        return getEmployeeDetailAdmin(id!);
      }
      return getEmployeeDetailPublic(id!);
    },
    enabled: !!id,
    select: (data) => mapEmployeeDetail(data),
  });
};
