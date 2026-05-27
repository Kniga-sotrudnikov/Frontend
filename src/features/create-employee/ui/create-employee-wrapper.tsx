import { useState } from "react";
import { CreateEmployeeButton } from "./create-employee-button";
import { CreateEmployeeDialog } from "./create-employee-dialog";
import type { CreateEmployeeFormValues } from "../model/types";

interface CreateEmployeeWrapperProps {
  className?: string;
  onSuccess?: (data: CreateEmployeeFormValues) => void;
}

export const CreateEmployeeWrapper = ({ onSuccess }: CreateEmployeeWrapperProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: CreateEmployeeFormValues) => {
    onSuccess?.(data);
  };

  return (
    <>
      <CreateEmployeeButton onClick={() => setOpen(true)} />
      <CreateEmployeeDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
};