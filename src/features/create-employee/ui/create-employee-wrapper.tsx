import { useState } from "react";
import { CreateEmployeeButton } from "./create-employee-button";
import { CreateEmployeeDialog } from "./create-employee-dialog";
import type { CreateEmployeeFormValues } from "../model/types";
import { useCreateEmployee } from "@/entities/employee";

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
  const { mutate } = useCreateEmployee();

  //TODO: разобраться с недостающими полями и с несоответствием типов!
  // Согласовать обязательные поля с бекендом
  // Убрать моковые данные
  const handleSubmit = async (data: CreateEmployeeFormValues) => {
    mutate({
      full_name: data.fullName,
      job_title: data.position,
      email: data.emailCorporate,
      phone: data.phoneCorporate,
      birthday: "0001-01-01",
      department: 1,
    });
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
