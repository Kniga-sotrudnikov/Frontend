import type { OrgUnit, SelectedOrgUnit } from "@/entities/org-structure";

export function handleSelect(
  unit: OrgUnit,
  selectedUnit: SelectedOrgUnit | null,
  setSelectedUnit: (unit: SelectedOrgUnit | null) => void,
) {
  if (unit.id == null) return;

  if (selectedUnit?.id === unit.id) {   // повторный клик = сброс
    setSelectedUnit(null);
    return;
  }

  if (unit.head) {
    setSelectedUnit({ id: unit.id, name: unit.name, head: true });
    return;
  }

  if (unit.type === "direction" || unit.type === "department") {
    setSelectedUnit({ id: unit.id, name: unit.name, head: false, type: unit.type });
  }
}