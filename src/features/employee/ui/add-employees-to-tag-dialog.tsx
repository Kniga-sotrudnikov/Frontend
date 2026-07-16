import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@ui/dialog";
import { Button } from "@ui/button";
import { SelectedEmployeesList } from "./selected-employees-list";

type Employee = {
  id: string;
  name: string;
  position: string;
  photo?: string;
};

type AddEmployeesToTagDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tagLabel: string;
  tagId: number;
  employees: Employee[];
  selectedEmployees: string[];
  onEmployeeToggle: (employeeId: string) => void;
  onClearEmployees: () => void;
  onAdd: () => void;
  isPending?: boolean;
};

export const AddEmployeesToTagDialog = ({
  open,
  onOpenChange,
  tagLabel,
  employees,
  selectedEmployees,
  onEmployeeToggle,
  onClearEmployees,
  onAdd,
  isPending = false,
}: AddEmployeesToTagDialogProps) => {
  const handleAdd = () => {
    if (selectedEmployees.length === 0) {
      return;
    }
    onAdd();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[680px] !max-w-none !rounded-8 !border !border-gray-200 !bg-white !p-0">
        <div className="flex justify-between items-center px-5 pt-5 pb-0 flex-shrink-0">
          <DialogHeader className="!p-0">
            <DialogTitle className="text-[16px] font-semibold text-gray-900 leading-[22px]">
              Добавить сотрудников к тегу «{tagLabel}»
            </DialogTitle>
          </DialogHeader>
          <DialogClose variant="icon" />
        </div>

        <div className="flex-1 px-5 py-4 max-h-[500px] overflow-y-auto">
          {employees.length > 0 ? (
            <SelectedEmployeesList
              employees={employees.map((emp) => ({
                id: Number(emp.id),
                name: emp.name,
                job: emp.position,
                photo: emp.photo || "",
              }))}
              selectedIds={selectedEmployees.map((id) => Number(id))}
              onToggle={(id) => onEmployeeToggle(String(id))}
              maxVisible={5}
            />
          ) : (
            <div className="text-center text-gray-500 py-8">
              Нет доступных сотрудников
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 px-5 pb-5 pt-0 flex-shrink-0">
          <Button
            variant="outline"
            onClick={() => {
              onClearEmployees();
              onOpenChange(false);
            }}
            className="w-[89px] h-[32px] text-xs font-medium border-purple-500 text-purple-500 hover:bg-purple-50"
          >
            Отмена
          </Button>
          <Button
            onClick={handleAdd}
            disabled={isPending || selectedEmployees.length === 0}
            className="w-[98px] h-[33px] text-xs font-medium bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-50"
          >
            {isPending ? "Добавление..." : "Добавить"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};