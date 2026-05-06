import { Button } from "@ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui/collapsible"
import ArrowIcon from "@/shared/assets/icons/arrow-right.svg?react"
import type { OrgUnit } from "./navbar-types"

function renderUnit(unit: OrgUnit)  {
    if ("items" in unit) {
      return (
        <Collapsible key={unit.name}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
            >
              <ArrowIcon className="transition-transform group-data-[state=open]:rotate-90" />
              {unit.name}

            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-1 ml-5 style-lyra:ml-4">
            <div className="flex flex-col gap-1">
              {unit.items.map((child) => renderUnit(child))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    }
    return (
      <Button
        key={unit.name}
        variant="link"
        size="sm"
        className="w-full justify-start gap-2 text-foreground"
      >
        <span>{unit.name}</span>
        <span>{unit.employeeCount}</span>
      </Button>
    )
}

export default renderUnit

