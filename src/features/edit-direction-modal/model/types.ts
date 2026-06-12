import type { OrgItemType } from "@/entities/org-structure";
import type { TShortEmployee } from "@/entities/employee";

export type Department = OrgItemType;

export interface DirectionFormValues {
  name: string;
  headName: string;
  description: string;
}

export interface EditDirectionModalProps {
  /** Trigger element — omit when using controlled `open` prop */
  children?: React.ReactNode;
  /** Controlled open state */
  entityType?: "direction" | "sis";
  shortEmployees?: TShortEmployee[];
  initialHeadId?: number | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialName?: string;
  initialHeadName?: string;
  initialDescription?: string;
  departments?: Department[];
  onAddDepartment?: () => void;
  onEditDepartment?: (dept: Department) => void;
  onDeleteDepartment?: (dept: Department) => void;
  onSave?: (values: DirectionFormValues, departments: Department[]) => void;
}
