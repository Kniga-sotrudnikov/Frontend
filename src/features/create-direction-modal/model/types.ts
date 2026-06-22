import type { TShortEmployee } from "@/entities/employee";

export interface CreateDirectionFormValues {
  name: string;
  headName: string;
  headId: number | null;
  description: string;
}

export interface CreateDirectionModalProps {
  /** Триггер открытия — не передавать при контролируемом `open` */
  children?: React.ReactNode;
  entityType?: "direction" | "sis";
  shortEmployees?: TShortEmployee[];
  /** Контролируемое состояние открытия */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Вызывается при создании направления/СИС (шаг 1) */
  onCreate?: (values: CreateDirectionFormValues) => void;
}
