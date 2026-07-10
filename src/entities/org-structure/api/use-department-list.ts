import { useQuery } from "@tanstack/react-query";
import { departmentApi } from "./department-api";
import type { PaginatedDepartmentBrief } from "../model/types";

export const useDepartmentsList = (limit?: number, offset?: number) => {
  return useQuery<PaginatedDepartmentBrief>({
    queryKey: ["departments-list", limit, offset],
    queryFn: async () => {
      const response = await departmentApi.getList({limit, offset});
      return response.data;
    },
  });
};