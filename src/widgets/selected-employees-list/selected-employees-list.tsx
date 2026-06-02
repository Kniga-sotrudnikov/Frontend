import type { TShortEmployee } from "@/entities/employee";
import { SelectedEmployee } from "@/entities/employee/ui/selected-employee.tsx";
import { Button } from "@ui/button";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/collapsible";

type TSelectedEmployeesListProps = {
  employees: TShortEmployee[];
  maxVisible?: number;
};

export const SelectedEmployeesList = ({
  employees,
  maxVisible = 3,
}: TSelectedEmployeesListProps) => {
  const [expanded, setExpanded] = useState(false);

  const visibleEmployees = employees.slice(0, maxVisible);
  const hiddenEmployees = employees.slice(maxVisible);
  const hiddenCount = hiddenEmployees.length;

  const renderEmployees = (employees: TShortEmployee[]) => {
    return (
      <ul className="flex justify-between">
        {employees.map((employee) => (
          <li key={employee.id}>
            <SelectedEmployee
              name={employee.name}
              job={employee.job}
              photo={employee.photo}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {renderEmployees(visibleEmployees)}

      {hiddenCount > 0 && (
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <CollapsibleTrigger asChild>
            <Button
              variant="plain"
              size="plain"
              className="font-(--font-weight-regular) text-muted-foreground"
            >
              {`Показать всех (${hiddenCount})`}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {renderEmployees(hiddenEmployees)}

            {expanded && (
              <CollapsibleTrigger asChild>
                <Button
                  variant="plain"
                  size="plain"
                  className="font-(--font-weight-regular) text-muted-foreground"
                >
                  {`Скрыть`}
                </Button>
              </CollapsibleTrigger>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};
