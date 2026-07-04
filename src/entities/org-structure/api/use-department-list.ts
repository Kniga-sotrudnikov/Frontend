import { useQuery } from "@tanstack/react-query";
import { departmentApi } from "./department-api";
import type { DepartmentListParams, PaginatedDepartmentBrief } from "../model/types";

export const useDepartmentsList = (params?: DepartmentListParams) => {
  return useQuery<PaginatedDepartmentBrief>({
    queryKey: ["departments-list", params],
    queryFn: async () => {
      const response = await departmentApi.getList(params);
      return response.data;
    },
  });
};