import type { OrgItemType } from "@/entities/org-structure";

export type Department = OrgItemType;

export interface DirectionFormValues {
  name: string;
  headName: string;
  description: string;
}

export interface EditDirectionModalProps {
  children?: React.ReactNode;
  entityType?: "direction" | "sis";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialName?: string;
  initialHeadName?: string;
  initialHeadId?: number | null;
  initialDescription?: string;
  departments?: Department[];
  onAddDepartment?: () => void;
  onEditDepartment?: (dept: Department) => void;
  onDeleteDepartment?: (dept: Department) => void;
  onSave?: (values: DirectionFormValues, departments: Department[]) => void;
  departmentId?: number;
}
