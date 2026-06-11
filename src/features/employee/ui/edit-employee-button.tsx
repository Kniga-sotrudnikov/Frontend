import { useState } from "react";
import { EditEmployeeDialog } from "./edit-employee-dialog";
import type { EmployeeData } from "@/entities/employee";

interface EditEmployeeButtonProps {
  employee: EmployeeData;
  onSuccess?: (updatedEmployee: EmployeeData) => void;
  children: React.ReactNode;
}

export const EditEmployeeButton = ({
  employee,
  onSuccess,
  children,
}: EditEmployeeButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = (updatedEmployee: EmployeeData) => {
    onSuccess?.(updatedEmployee);
    setOpen(false);
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </div>
      <EditEmployeeDialog
        open={open}
        onOpenChange={setOpen}
        employee={employee}
        onSuccess={handleSuccess}
      />
    </>
  );
};
