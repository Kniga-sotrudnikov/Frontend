import type { ColumnDef } from "@tanstack/react-table";
import type { TEmployee } from "@ui/table/types.ts";

import SortDescIcon from "@/shared/assets/icons/sort-1.svg?react";
import SortAscIcon from "@/shared/assets/icons/sort-2.svg?react";
import { Button } from "@ui/button";

export const columns: ColumnDef<TEmployee>[] = [
  {
    accessorKey: "name",
    header: "ФИО",
    size: 261,
  },
  {
    accessorKey: "position",
    size: 144,
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      const SortIcon = sortDirection === "desc" ? SortDescIcon : SortAscIcon;

      return (
        <div className="flex items-center justify-between">
          <span>Должность</span>
          <Button
            variant="ghost"
            size="icon-xl"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <SortIcon className="size-5" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "section",
    size: 144,
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      const SortIcon = sortDirection === "desc" ? SortDescIcon : SortAscIcon;

      return (
        <div className="flex items-center justify-between">
          <span>Раздел</span>
          <Button
            variant="ghost"
            size="icon-xl"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <SortIcon className="size-5" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "department",
    size: 144,
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      const SortIcon = sortDirection === "desc" ? SortDescIcon : SortAscIcon;

      return (
        <div className="flex items-center justify-between">
          <span>Отдел</span>
          <Button
            variant="ghost"
            size="icon-xl"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <SortIcon className="size-5" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    size: 116,
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      const SortIcon = sortDirection === "desc" ? SortDescIcon : SortAscIcon;

      return (
        <div className="flex items-center justify-between">
          <span>Статус</span>
          <Button
            variant="ghost"
            size="icon-xl"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <SortIcon className="size-5" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "city",
    size: 132,
    header: ({ column }) => {
      const sortDirection = column.getIsSorted();
      const SortIcon = sortDirection === "desc" ? SortDescIcon : SortAscIcon;

      return (
        <div className="flex items-center justify-between">
          <span>Город</span>
          <Button
            variant="ghost"
            size="icon-xl"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <SortIcon className="size-5" />
          </Button>
        </div>
      );
    },
  },
];
