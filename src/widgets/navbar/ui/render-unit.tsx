import { useMemo } from "react";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";
import ArrowIcon from "@icons/arrow-right.svg?react";
import type { OrgUnit } from "@/entities/org-structure";
import countEmployee from "@/widgets/navbar/assets/count-employee";

interface RenderUnitProps {
  unit: OrgUnit;
  selectedName: string | null;
  onSelect: (name: string) => void;
}

function RenderUnit({ unit, selectedName, onSelect }: RenderUnitProps) {
  const employeeCount = useMemo(() => countEmployee(unit), [unit]);
  const isActive = selectedName === unit.name;
  if (unit.items && unit.items.length > 0) {
    return (
      <Collapsible onOpenChange={() => onSelect(unit.name)}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "group w-full justify-start transition-none text-sm",
              isActive &&
                "bg-secondary hover:bg-secondary aria-expanded:bg-secondary",
              unit.head && "mt-5",
            )}
          >
            <ArrowIcon className="transition-transform group-data-[state=open]:rotate-90" />
            <span className={cn("truncate", unit.head && "font-bold")}>
              {unit.name}
            </span>
            <span className="text-primary">{employeeCount}</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-1 ml-5">
          <div className="flex flex-col gap-1">
            {unit.items.map((item) => (
              <RenderUnit
                unit={item}
                selectedName={selectedName}
                onSelect={onSelect}
                key={item.name}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSelect(unit.name)}
      className={cn(
        "w-full justify-start gap-2 text-foreground text-sm",
        isActive && "bg-secondary hover:bg-secondary",
        unit.head && "mt-5",
      )}
    >
      <span className={cn("truncate", unit.head && "font-bold")}>
        {unit.name}
      </span>
      <span className="text-muted-foreground">{unit.employeeCount ?? 0}</span>
    </Button>
  );
}

export default RenderUnit;
