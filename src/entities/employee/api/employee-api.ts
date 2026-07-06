import { apiClient } from "@/shared/api/client";
import type {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
  PatchEmployeeRequest,
  PatchEmployeeResponse,
  EmployeeDetailAdminResponse,
  EmployeeDetailPublicResponse,
  EmployeesListResponse,
  EmployeesListFilter,
} from "@/entities/employee";

type EmployeesListParams = {
  limit?: number;
  offset?: number;
} & EmployeesListFilter;

export const getEmployeesListAdmin = async (
  params?: EmployeesListParams,
): Promise<EmployeesListResponse> => {
  const response = await apiClient.get<EmployeesListResponse>(
    "/admin/employees/",
    { params },
  );
  return response.data;
};

export const getEmployeesListPublic = async (
  params?: EmployeesListParams,
): Promise<EmployeesListResponse> => {
  const response = await apiClient.get<EmployeesListResponse>("/employees/", {
    params,
  });
  return response.data;
};

export const getEmployeeDetailAdmin = async (
  id: number,
): Promise<EmployeeDetailAdminResponse> => {
  const response = await apiClient.get<EmployeeDetailAdminResponse>(
    `/admin/employees/${id}/`,
  );
  return response.data;
};

export const getEmployeeDetailPublic = async (
  id: number,
): Promise<EmployeeDetailPublicResponse> => {
  const response = await apiClient.get<EmployeeDetailPublicResponse>(
    `/employees/${id}/`,
  );
  return response.data;
};

export const createEmployee = async (
  data: CreateEmployeeRequest,
): Promise<CreateEmployeeResponse> => {
  const response = await apiClient.post<CreateEmployeeResponse>(
    "/admin/employees/",
    data,
  );
  return response.data;
};

//TODO: проверить типы id, может лучше оставить что-то одно
export const patchEmployee = async (
  id: string | number,
  data: PatchEmployeeRequest,
): Promise<PatchEmployeeResponse> => {
  const response = await apiClient.patch<PatchEmployeeResponse>(
    `/admin/employees/${id}/`,
    data,
  );
  return response.data;
};

//TODO: проверить типы id, может лучше оставить что-то одно
export const deleteEmployee = async (id: string | number) => {
  await apiClient.delete(`/admin/employees/${id}/`);
};
