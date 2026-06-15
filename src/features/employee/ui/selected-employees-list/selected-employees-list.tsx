import { useState } from "react";
import { Button } from "@ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/collapsible";
import { Checkbox } from "@ui/checkbox";

type SelectedEmployeesListProps = {
  employees: Array<{
    id: number;
    name: string;
    job: string;
    photo: string;
  }>;
  selectedIds: number[];
  onToggle: (employeeId: string) => void;
  maxVisible?: number;
};

export const SelectedEmployeesList = ({
  employees,
  selectedIds,
  onToggle,
  maxVisible = 4,
}: SelectedEmployeesListProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const visibleEmployees = employees.slice(0, maxVisible);
  const hiddenEmployees = employees.slice(maxVisible);
  const hiddenCount = hiddenEmployees.length;

  if (employees.length === 0) {
    return (
      <div className="text-sm text-gray-500 py-8 text-center">
        Нет доступных сотрудников
      </div>
    );
  }

  const renderEmployee = (employee: { id: number; name: string; job: string; photo: string }) => {
    const isSelected = selectedIds.includes(employee.id);
    
    return (
      <div
        key={employee.id}
        className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
          isSelected 
            ? "border-purple-500 bg-purple-50" 
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="flex items-center gap-3 flex-1">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggle(String(employee.id))}
            className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
          />
          <img
            src={employee.photo}
            alt={employee.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              {employee.name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {employee.job}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-600 mb-3">
        Выбрано: {selectedIds.length} из {employees.length}
      </div>
      
      <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2">
        {visibleEmployees.map(renderEmployee)}
      </div>

      {hiddenCount > 0 && (
        <Collapsible open={expanded} onOpenChange={setExpanded} className="mt-2">
          {!expanded && (
            <CollapsibleTrigger asChild>
              <Button variant="plain" size="plain" className="text-xs text-purple-500">
                Показать всех ({hiddenCount})
              </Button>
            </CollapsibleTrigger>
          )}

          <CollapsibleContent>
            <div className="flex flex-col gap-2 mt-2">
              {hiddenEmployees.map(renderEmployee)}
            </div>
            {expanded && (
              <CollapsibleTrigger asChild>
                <Button variant="plain" size="plain" className="text-xs text-purple-500 mt-2">
                  Скрыть
                </Button>
              </CollapsibleTrigger>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};