import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@ui/dialog";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[500px] !max-w-none !p-0 !rounded-8 !border !border-gray-200 !bg-white">
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

          <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
            {employees.length > 0 ? (
              employees.map((employee, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 border-b border-gray-100"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    {employee.photo ? (
                      <img
                        src={employee.photo}
                        alt={employee.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                        Нет фото
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {employee.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {employee.position}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                Нет сотрудников с этим тегом
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end px-5 pb-5 pt-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-[89px] h-[32px]"
          >
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};