import { Button } from "@ui/button";
import { Badge } from "@/shared/ui/badge";
import StarIcon from "@/shared/assets/icons/star.svg?react";
import type { ColumnDef } from "@tanstack/react-table";
import type { EmployeeData } from "@/entities/employee";
import type { VacancyData } from "@/entities/vacancy";

const statusConfig: Record<
  EmployeeData["status"],
  { label: string; className: string }
> = {
  working: {
    label: "В работе",
    className:
      "border-[var(--color-green-700)] bg-[var(--color-green-100)] text-[var(--color-green-700)]",
  },
  vacation: {
    label: "В отпуске",
    className:
      "border-[var(--color-yellow-700)] bg-[var(--color-yellow-100)] text-[var(--color-yellow-800)]",
  },
  bizTrip: {
    label: "Командировка",
    className:
      "border-[var(--color-purple-500)] bg-[var(--color-purple-100)] text-[var(--color-purple-500)]",
  },
  sick: {
    label: "Болеет",
    className:
      "border-[var(--color-gray-700)] bg-[var(--color-gray-200)] text-[var(--color-gray-700)]",
  },
};

export const getEmployeeColumns = (
  favoritesIds: (number | string)[],
  onToggleFavorite: (id: number | string) => void,
): ColumnDef<EmployeeData>[] => [
  {
    id: "favorite",
    header: "",
    size: 40,
    enableSorting: false,
    cell: ({ row }) => {
      const isFavorite = favoritesIds.includes(row.original.id);
      return (
        <StarIcon
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(row.original.id);
          }}
          className={isFavorite ? "text-accent" : "text-gray-300"}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "ФИО",
    size: 220,
    enableSorting: true,
  },
  {
    accessorKey: "position",
    header: "Должность",
    size: 144,
    enableSorting: true,
  },
  {
    accessorKey: "franchise",
    header: "Раздел",
    size: 144,
    enableSorting: true,
  },
  {
    accessorKey: "department",
    header: "Отдел",
    size: 144,
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Статус",
    size: 116,
    enableSorting: true,
    cell: ({ getValue }) => {
      const status = getValue() as EmployeeData["status"];
      const config = statusConfig[status];
      return (
        <div className="w-full overflow-hidden text-clip mask-[linear-gradient(to_right,black_calc(100%-20px),transparent)]">
          <Badge className={`${config.className} whitespace-nowrap`}>
            {config.label}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    header: "Город",
    size: 132,
    enableSorting: true,
  },
];

export const getVacancyColumns = (
  favoritesIds: (number | string)[],
  onToggleFavorite: (id: number | string) => void,
  onRespond: (vacancy: VacancyData) => void,
): ColumnDef<VacancyData>[] => [
  {
    id: "favorite",
    header: "",
    size: 40,
    enableSorting: false,
    cell: ({ row }) => {
      const isFavorite = favoritesIds.includes(row.original.id);
      return (
        <StarIcon
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite(row.original.id);
          }}
          className={isFavorite ? "text-accent" : "text-gray-300"}
        />
      );
    },
  },
  {
    accessorKey: "profession",
    header: "Название должности",
    size: 220,
    enableSorting: true,
  },
  {
    accessorKey: "franchise",
    header: "Направление",
    size: 144,
    enableSorting: true,
  },
  {
    accessorKey: "department",
    header: "Отдел",
    size: 144,
    enableSorting: true,
  },
  {
    accessorKey: "city",
    header: "Город",
    size: 132,
    enableSorting: true,
  },
  {
    id: "respond",
    header: "",
    size: 230,
    enableSorting: false,
    cell: ({ row }) => (
      <Button
        className="w-full"
        onClick={(event) => {
          event.stopPropagation();
          onRespond(row.original);
        }}
      >
        Откликнуться
      </Button>
    ),
  },
];
