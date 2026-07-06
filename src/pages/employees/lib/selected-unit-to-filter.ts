import type { SelectedOrgUnit } from "@/entities/org-structure";
import type { EmployeesListFilter } from "@/entities/employee";

/**
 * Превращает выбранный узел оргструктуры в query-фильтр списка сотрудников.
 * - верхнеуровневые «Направления» → `?direction`;
 * - направление → `?direction_id`;
 * - отдел → `?department_id`;
 * - ничего не выбрано / прочие заголовки (УК, СИС) → без фильтра.
 */
export function selectedUnitToFilter(
  selected: SelectedOrgUnit | null,
): EmployeesListFilter {
  if (!selected) return {};

  if (selected.head) {
    return selected.name === "Направления" ? { direction: true } : {};
  }

  if (selected.type === "direction") return { direction_id: selected.id };
  if (selected.type === "department") return { department_id: selected.id };

  return {};
}
