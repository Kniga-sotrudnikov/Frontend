import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEmployee,
  deleteEmployee,
  patchEmployee,
} from "@/entities/employee";
import { useNotificationStore } from "@/shared/model/stores";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.add);

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees-list"],
      });

      addNotification({
        type: "success",
        iconType: "success",
        title: "Сотрудник создан",
        message: "Карточка сотрудника успешно создана",
      });
    },
  });
};

export const usePatchEmployee = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.add);

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | number;
      data: Parameters<typeof patchEmployee>[1];
    }) => patchEmployee(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["employees-list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["employee-detail", variables.id],
      });

      addNotification({
        type: "success",
        iconType: "success",
        title: "Сотрудник изменён",
        message: "Информация в карточке сотрудника успешно изменена",
      });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore((state) => state.add);

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["employees-list"],
      });

      addNotification({
        type: "success",
        iconType: "success",
        title: "Сотрудник архивирован",
        message: "Карточка сотрудника успешно архивирована",
      });
    },
  });
};
