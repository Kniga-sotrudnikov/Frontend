import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import type { DepartmentResponse, OrgUnit } from "../model/types";

function mapDepartmentToOrgUnit(data: DepartmentResponse): OrgUnit {
  return {
    id: data.id,
    name: data.name,
    employeeCount: data.employee_count,
    items: data.children?.map(mapDepartmentToOrgUnit) || [],
  };
}

export const useOrgStructure = () => {
  return useQuery({
    queryKey: ["org-structure"],
    queryFn: async () => {
      const response = await apiClient.get<DepartmentResponse[]>("/org-structure/tree/");
      return response.data;
    },
    select: (data) => data.map(mapDepartmentToOrgUnit),
  });
};