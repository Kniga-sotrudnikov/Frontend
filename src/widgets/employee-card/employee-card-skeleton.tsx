import { Skeleton } from "@ui/skeleton";

export const EmployeeCardsSkeleton = ({ count }: { count: number }) => (
  <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(370px,1fr))]">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="flex flex-col p-5.75 border border-gray-200 rounded-8 bg-white"
      >
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-3 w-24" />

          <div className="flex items-center gap-2 shrink-0">
            <Skeleton className="size-5 rounded-full" />
            <Skeleton className="size-5 rounded-full" />
          </div>
        </div>

        <div className="border-b pb-3 mb-3">
          <div className="flex gap-3">
            <div className="relative shrink-0 w-22 h-19 bg-gray-100 rounded-8 overflow-hidden">
              <Skeleton className="size-full rounded-8" />
              <Skeleton className="absolute bottom-0 right-0 size-5 rounded-full" />
            </div>

            <div className="flex-1 min-w-0">
              <Skeleton className="h-5 w-4/5 mb-2" />
              <Skeleton className="h-5 w-3/5 mb-2" />
              <Skeleton className="h-3 w-2/3 mb-1" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
