import type { ReactNode } from "react";

import { Skeleton } from "@ui/skeleton";

import {
  type ColumnDef,
  type SortingState,
  type OnChangeFn,
  flexRender,
  getCoreRowModel,
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
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: ReactNode;
  skeletonRows?: number;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  sorting,
  onSortingChange,
  isLoading = false,
  isError = false,
  errorMessage = "Данные не загрузились",
  skeletonRows = 6,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange,
    state: {
      sorting,
    },
  });

  return (
    <div className="overflow-hidden border">
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
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                className="h-11"
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

export default DataTable;
