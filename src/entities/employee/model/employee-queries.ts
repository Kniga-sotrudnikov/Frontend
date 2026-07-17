import { keepPreviousData, useInfiniteQuery, useQuery, type InfiniteData } from "@tanstack/react-query";
import {
  getEmployeeDetailAdmin,
  getEmployeeDetailPublic,
  getEmployeesListAdmin,
  getEmployeesListPublic,
  mapEmployeeDetail,
  mapEmployeeListResponse,
} from "@/entities/employee";
import type { UserRole } from "@/entities/user";
import type { EmployeesListFilter, EmployeesListResponse } from "@/entities/employee";

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
    placeholderData: keepPreviousData,
    select: (data) => ({
      ...data,
      results: data.results.map(mapEmployeeListResponse),
    }),
  });
};

export const useEmployeesInfinite = (
  limit = 20,
  role: UserRole = "employee",
  filter: EmployeesListFilter = {},
) => {
  return useInfiniteQuery<
    EmployeesListResponse,            // TQueryFnData
    Error,                            // TError
    InfiniteData<EmployeesListResponse>, // TData
    [string, UserRole, string],       // TQueryKey
    number                            // TPageParam
  >({
    queryKey: ["employees-infinite", role, JSON.stringify(filter)],

    initialPageParam: 0,

    queryFn: ({ pageParam }) => {
      const params = {
        limit,
        offset: pageParam,
        ...filter,
      };

      return role === "hr_admin"
        ? getEmployeesListAdmin(params)
        : getEmployeesListPublic(params);
    },

    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * limit;

      if (loaded < lastPage.count) {
        return loaded;
      }

      return undefined;
    },
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
