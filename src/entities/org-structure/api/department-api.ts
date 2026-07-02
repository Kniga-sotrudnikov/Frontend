import { apiClient } from "@/shared/api/client";
import type { 
  DepartmentCreateDTO, 
  DepartmentUpdateDTO, 
  DepartmentResponse 
} from "../model/types";

export const departmentApi = {
  create: (data: DepartmentCreateDTO) => 
    apiClient.post<DepartmentResponse>('/departments/', data),
  
  update: (id: number, data: DepartmentUpdateDTO) => 
    apiClient.patch<DepartmentResponse>(`/departments/${id}/`, data),
  
  getById: (id: number) => 
    apiClient.get<DepartmentResponse>(`/departments/${id}/`),
  
  getTree: () => 
    apiClient.get<DepartmentResponse[]>('/org-structure/tree/'),
};