import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/shared/lib";
import {
  getEmployeesListPublic,
  mapEmployeeListResponse,
  type EmployeeData,
} from "@/entities/employee";

const SUGGEST_LIMIT = 5;
const MIN_QUERY_LENGTH = 2;

/**
 * Подсказки для поиска сотрудников в header'е:
 * по введённой строке запрашивает первые совпадения из списка сотрудников.
 */
export const useSearchSuggest = (query: string) => {
  const debouncedQuery = useDebounce(query).trim();
  const enabled = debouncedQuery.length >= MIN_QUERY_LENGTH;

  const { data, isFetching } = useQuery({
    queryKey: ["employee-search-suggest", debouncedQuery],
    queryFn: () =>
      getEmployeesListPublic({
        limit: SUGGEST_LIMIT,
        offset: 0,
        search: debouncedQuery,
      }),
    enabled,
    placeholderData: keepPreviousData,
    select: (response): EmployeeData[] =>
      response.results.map(mapEmployeeListResponse),
  });

  return {
    suggestions: enabled ? (data ?? []) : [],
    isFetching,
  };
};
