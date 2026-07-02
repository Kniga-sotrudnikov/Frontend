import type { TShortEmployee } from "@/entities/employee";

export interface CreateDirectionFormValues {
  name: string;
  headName: string;
  headId: number | null;
  description: string;
}

export interface CreateDirectionModalProps {
  children?: React.ReactNode;
  entityType?: "direction" | "sis";
  shortEmployees?: TShortEmployee[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCreate?: (values: CreateDirectionFormValues) => void;
}