import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationStore } from "@/shared/model/stores";
import { departmentApi } from "./department-api";
import { handleHttpError } from "@/shared/api/client";
import type { DepartmentCreateDTO, DepartmentUpdateDTO } from "../model/types";
import type { AxiosError } from "axios";

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.add);

  return useMutation({
    mutationFn: (data: DepartmentCreateDTO) => departmentApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org-structure"] });
      addNotification({
        type: "success",
        iconType: "success",
        title: "Успешно",
        message: "Подразделение создано",
      });
    },
    onError: (error: AxiosError) => {
      handleHttpError(error);
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.add);

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: DepartmentUpdateDTO }) =>
      departmentApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org-structure"] });
      addNotification({
        type: "success",
        iconType: "success",
        title: "Успешно",
        message: "Подразделение обновлено",
      });
    },
    onError: (error: AxiosError) => {
      handleHttpError(error);
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.add);

  return useMutation({
    mutationFn: (id: number) => departmentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["org-structure"] });
      addNotification({
        type: "success",
        iconType: "success",
        title: "Успешно",
        message: "Подразделение удалено",
      });
    },
    onError: (error: AxiosError) => {
      handleHttpError(error);
    },
  });
};