import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import type { OrgUnit } from "../model/types";

export interface OrgUnitResponse {
  id: number;
  name: string;
  // TODO В ответе пока только Направления и отделы, добавить СИС/УК, когда появятся
  // Возможно СИС/УК будут самостоятельные api
  type: "direction" | "department";
  employee_count: number;
  children: OrgUnitResponse[];
}

function mapOrgUnit(data: OrgUnitResponse): OrgUnit {
  return {
    id: data.id,
    name: data.name,
    employeeCount: data.employee_count,
    items: data.children.map(mapOrgUnit),
  };
}

export const useOrgStructure = () => {
  return useQuery({
    queryKey: ["org-structure"],
    queryFn: async () => {
      const response = await apiClient.get<OrgUnitResponse[]>("/org-structure/tree/");
      return response.data;
    },
    select: (data) => data.map(mapOrgUnit)
  })
}