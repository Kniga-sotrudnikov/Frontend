import { useState, type ReactNode } from "react";

import { Button } from "@/shared/ui/button";
import { Skeleton } from "@ui/skeleton";
import { cn } from "@/shared/lib";

import SortDescIcon from "@/shared/assets/icons/sort-1.svg?react";
import SortAscIcon from "@/shared/assets/icons/sort-2.svg?react";

import {
  type ColumnDef,
  type SortingState,
  type OnChangeFn,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table.tsx";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  onRowClick?: (row: TData) => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: ReactNode;
  skeletonRows?: number;
  containerClassName?: string;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  sorting,
  onSortingChange,
  onRowClick,
  isLoading = false,
  isError = false,
  errorMessage = "Данные не загрузились",
  skeletonRows = 6,
  containerClassName,
}: DataTableProps<TData, TValue>) => {
  const [localSorting, setLocalSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: onSortingChange ?? setLocalSorting,
    state: {
      sorting: sorting ?? localSorting,
    },
  });

  return (
    <div
      className={cn(
        "overflow-hidden rounded-t-xl bg-white",
        containerClassName,
      )}
    >
      <Table className="table-fixed">
        <colgroup>
          {table.getAllLeafColumns().map((column) => (
            <col key={column.id} style={{ width: `${column.getSize()}px` }} />
          ))}
        </colgroup>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div className="flex items-center justify-between">
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>

                        <Button
                          variant="ghost"
                          size="icon-xl"
                          onClick={() =>
                            header.column.toggleSorting(
                              header.column.getIsSorted() === "asc",
                            )
                          }
                        >
                          {header.column.getIsSorted() === "desc" ? (
                            <SortDescIcon className="size-5" />
                          ) : (
                            <SortAscIcon className="size-5" />
                          )}
                        </Button>
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: skeletonRows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {table.getAllLeafColumns().map((column) => (
                  <TableCell key={column.id}>
                    <Skeleton className="h-6.5 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : isError ? (
            <TableRow>
              <TableCell
                colSpan={table.getAllLeafColumns().length}
                className="h-24 text-center text-destructive"
              >
                {errorMessage}
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-11 cursor-pointer"
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Нет данных.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
