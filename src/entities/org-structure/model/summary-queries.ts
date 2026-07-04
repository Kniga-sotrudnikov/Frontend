import { useQuery } from "@tanstack/react-query";
import { getSummaryStats } from "../api/summary-api";

export const summaryKeys = {
  all: ["summary"] as const,
};

export const useSummaryStats = () => {
  return useQuery({
    queryKey: summaryKeys.all,
    queryFn: getSummaryStats,
    staleTime: 5 * 60 * 1000,
  });
};
