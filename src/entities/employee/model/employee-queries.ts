import { useQuery } from "@tanstack/react-query";
import {
  getEmployeeDetailAdmin,
  getEmployeeDetailPublic,
  getEmployeesListAdmin,
  getEmployeesListPublic,
} from "../api/employee-api";

export const useEmployeesListAdmin = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: ["employees", "admin", "list", { limit, offset }],
    queryFn: () => getEmployeesListAdmin({ limit, offset }),
  });
};

export const useEmployeeDetailAdmin = (id?: number) => {
  return useQuery({
    queryKey: ["employees", "admin", "detail", id],
    queryFn: () => getEmployeeDetailAdmin(id!),
    enabled: !!id,
  });
};

export const useEmployeesListPublic = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: ["employees", "public", "list", { limit, offset }],
    queryFn: () => getEmployeesListPublic({ limit, offset }),
  });
};

export const useEmployeeDetailPublic = (id: number) => {
  return useQuery({
    queryKey: ["employees", "public", "detail", id],
    queryFn: () => getEmployeeDetailPublic(id),
    enabled: !!id,
  });
};
