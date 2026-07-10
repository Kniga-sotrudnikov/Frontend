import { apiClient } from "@/shared/api/client";
import type { 
  DepartmentCreateDTO, 
  DepartmentUpdateDTO, 
  DepartmentResponse, 
  DepartmentListParams,
  PaginatedDepartmentBrief
} from "../model/types";

export const departmentApi = {
    getList: (params?: DepartmentListParams) =>
    apiClient.get<PaginatedDepartmentBrief>('/departments/', {
      params,
    }),
    
  create: (data: DepartmentCreateDTO) => 
    apiClient.post<DepartmentResponse>('/departments/', data),
  
  update: (id: number, data: DepartmentUpdateDTO) => 
    apiClient.patch<DepartmentResponse>(`/departments/${id}/`, data),
  
  getById: (id: number) => 
    apiClient.get<DepartmentResponse>(`/departments/${id}/`),
  
  getTree: () => 
    apiClient.get<DepartmentResponse[]>('/org-structure/tree/'),

  delete: (id: number) => 
    apiClient.delete(`/departments/${id}/`),
};