import type { OrgUnit } from "@/entities/org-structure";

function countEmployee(unit: OrgUnit): number {
  if (!unit.items?.length) return unit.employeeCount ?? 0;
  return unit.items.reduce((sum, child) => sum + countEmployee(child), 0);
}

export default countEmployee;
