import type { OrgUnit } from "..ui/navbar-types"

function countEmployee(unit: OrgUnit): number {
    if (!unit.items?.length) return unit.employeeCount
    return unit.items.reduce((sum, child) => sum + countEmployee(child), 0)
}

export default countEmployee