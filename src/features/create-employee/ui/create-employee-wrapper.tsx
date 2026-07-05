import { useState } from "react";
import { CreateEmployeeButton } from "./create-employee-button";
import { CreateEmployeeDialog } from "./create-employee-dialog";
import type { CreateEmployeeFormValues } from "../model/types";
import { useCreateEmployee } from "@/entities/employee";
import { format } from "date-fns";
import { useUploadEmployeePhoto } from "@/entities/employee/model/employee-mutations";
import { useNotificationStore } from "@/shared/model/stores";

interface CreateEmployeeWrapperProps {
  buttonClassName?: string;
  hideButtonLabelOnCompact?: boolean;
}

export const CreateEmployeeWrapper = ({
  buttonClassName,
  hideButtonLabelOnCompact = false,
}: CreateEmployeeWrapperProps) => {
  const [open, setOpen] = useState(false);
  //TODO: Обработать сценарий если при создании происходит ошибка
  const { mutateAsync } = useCreateEmployee();
  const { mutateAsync: uploadPhoto } = useUploadEmployeePhoto();
  const addNotification = useNotificationStore((state) => state.add);

  //TODO: разобраться с недостающими полями
  const handleSubmit = async (data: CreateEmployeeFormValues) => {
    try {
      const createdEmployee = await mutateAsync({
        full_name: data.fullName,
        job_title: data.position,
        role_description: data.role
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        email: data.emailCorporate,
        personal_email: data.emailPersonal,
        phone: data.phoneCorporate,
        personal_phone: data.phonePersonal,
        interests: data.aboutMe,
        birthday: format(data.birthday as Date, "yyyy-MM-dd"),
        department: Number(data.department),
        city: data.city,
        employment_status: data.status,
        crm_profile: data.crmProfileLink,
        resume_link: data.resumeLink,
        social_network: data.socialNetworkLink,
        //tags: data.competencies,
      });

      if (data.photo instanceof File) {
        await uploadPhoto({
          id: createdEmployee.id,
          file: data.photo,
        });
      }
      setOpen(false);
    } catch (error) {
      addNotification({
        type: "error",
        title: "Ошибка",
        message:
          error instanceof Error
            ? error.message
            : "Не удалось создать карточку сотрудника",
      });
    }
  };

  return (
    <>
      <CreateEmployeeButton
        onClick={() => setOpen(true)}
        className={buttonClassName}
        hideLabelOnCompact={hideButtonLabelOnCompact}
      />
      <CreateEmployeeDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
};
