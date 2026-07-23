import type { OrgUnit } from "../model/types";
import type { OrgItemType } from "../ui/org-item";

const toOrgItem = (unit: OrgUnit): OrgItemType => ({
  id: String(unit.id ?? ""),
  name: unit.name,
  headName: unit.headName ?? "",
});

export const getDirections = (tree: OrgUnit[]): OrgItemType[] =>
  tree.filter((unit) => unit.type === "direction").map(toOrgItem);

export const getSisList = (tree: OrgUnit[]): OrgItemType[] =>
  tree.filter((unit) => unit.type === "sis").map(toOrgItem);
