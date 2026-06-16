import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@ui/dialog";
import { SelectedEmployeesList } from "./selected-employees-list";

type EmployeesListDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  employees: Array<{ name: string; position: string; photo?: string }>;
  totalCount: number;
};

export const EmployeesListDialog = ({
  open,
  onOpenChange,
  title,
  employees,
  totalCount,
}: EmployeesListDialogProps) => {
  const formattedEmployees = employees.map((emp, idx) => ({
    id: idx,
    name: emp.name,
    job: emp.position,
    photo: emp.photo || "",
  }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[600px] !max-w-none !p-0 !rounded-8 !border !border-gray-200 !bg-white">
        <div className="flex justify-between items-center px-5 pt-5 pb-0 flex-shrink-0">
          <DialogHeader className="!p-0">
            <DialogTitle className="text-[16px] font-semibold text-gray-900 leading-[22px]">
              {title}
            </DialogTitle>
          </DialogHeader>
          <DialogClose variant="icon" />
        </div>

        <div className="px-5 py-5">
          <div className="mb-4">
            <span className="text-sm text-gray-600">
              Сотрудники: {totalCount}
            </span>
          </div>

          <SelectedEmployeesList
            employees={formattedEmployees}
            readonly={true}
            maxVisible={formattedEmployees.length}
          />
        </div>

        <div className="flex justify-end px-5 pb-5 pt-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-[89px] h-[32px] text-xs font-medium border-purple-500 text-purple-500 hover:bg-purple-50"
          >
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};