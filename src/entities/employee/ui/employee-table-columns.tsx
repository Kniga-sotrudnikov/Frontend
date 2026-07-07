import type { ColumnDef } from "@tanstack/react-table";
import type { TEmployee } from "@/entities/employee";
import { EmployeeStatus } from "./employee-status.tsx";
import { mapStatus } from "../utils/map-temployee-to-employee-data";

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
      return <EmployeeStatus status={mapStatus(row.original.employment_status || "working")} />;
    },
  },
  {
    accessorKey: "city",
    header: "Город",
    size: 132,
    enableSorting: true,
  },
];