import { useQuery } from "@tanstack/react-query";
import { vacancyApi } from "../api/vacancy-api";
import { normalizeVacancies, normalizeVacancyDetail } from "../lib/normalize";
import type {
  NormalizedVacancy,
  NormalizedVacancyDetail,
} from "../lib/normalize";

export const vacancyKeys = {
  all: ["vacancies"] as const,
  lists: () => [...vacancyKeys.all, "list"] as const,
  list: (params?: { limit?: number; offset?: number }) =>
    [...vacancyKeys.lists(), params] as const,
  detail: (id: number) => [...vacancyKeys.all, "detail", id] as const,
};

interface NormalizedVacanciesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NormalizedVacancy[];
}

export const useGetVacancies = (params?: {
  limit?: number;
  offset?: number;
}) => {
  return useQuery<NormalizedVacanciesResponse>({
    queryKey: vacancyKeys.list(params),
    queryFn: async () => {
      const data = await vacancyApi.getVacancies(params);
      return {
        ...data,
        results: normalizeVacancies(data.results),
      };
    },
  });
};

export const useGetVacancyDetail = (id: number) => {
  return useQuery<NormalizedVacancyDetail>({
    queryKey: vacancyKeys.detail(id),
    queryFn: async () => {
      const data = await vacancyApi.getVacancyDetail(id);
      return normalizeVacancyDetail(data);
    },
    enabled: !!id,
  });
};
