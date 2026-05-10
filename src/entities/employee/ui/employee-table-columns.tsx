import type { ColumnDef } from "@tanstack/react-table";
import { EmployeeStatus, type TEmployee } from "@/entities/employee";

export const employeeTableColumns: ColumnDef<TEmployee>[] = [
  {
    accessorKey: "full_name",
    header: "ФИО",
    size: 261,
    enableSorting: false,
  },
  {
    accessorKey: "job_title",
    header: "Должность",
    size: 144,
    enableSorting: true,
  },
  {
    accessorKey: "direction_name",
    header: "Раздел",
    size: 144,
    enableSorting: true,
  },
  {
    accessorKey: "department_name",
    header: "Отдел",
    size: 144,
    enableSorting: true,
  },
  {
    accessorKey: "status",
    size: 116,
    header: "Статус",
    enableSorting: true,
    cell: ({ row }) => {
      return <EmployeeStatus status={row.original.status} />;
    },
  },
  {
    accessorKey: "city",
    header: "Город",
    size: 132,
    enableSorting: true,
  },
];
