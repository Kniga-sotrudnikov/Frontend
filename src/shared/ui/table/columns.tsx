import type { ColumnDef } from "@tanstack/react-table";
import type { TEmployee } from "@ui/table/types.ts";

export const columns: ColumnDef<TEmployee>[] = [
  {
    accessorKey: "name",
    header: "ФИО",
    size: 261,
  },
  {
    accessorKey: "position",
    header: "Должность",
    size: 144,
  },
  {
    accessorKey: "section",
    header: "Раздел",
    size: 144,
  },
  {
    accessorKey: "department",
    header: "Отдел",
    size: 144,
  },
  {
    accessorKey: "status",
    header: "Статус",
    size: 116,
  },
  {
    accessorKey: "city",
    header: "Город",
    size: 132,
  },
];
