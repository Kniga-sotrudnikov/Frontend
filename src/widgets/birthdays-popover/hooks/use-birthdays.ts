import { useTodayBirthdays, useCurrentMonthBirthdays } from "@/entities/employee";
import type { BirthdayPerson } from "@/entities/employee";

interface UseBirthdaysReturn {
  todayBirthdays: BirthdayPerson[];
  currentMonthBirthdays: BirthdayPerson[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  hasBirthdaysToday: boolean;
}

export const useBirthdays = (): UseBirthdaysReturn => {
  const {
    data: todayBirthdays = [],
    isLoading: isLoadingToday,
    error: errorToday,
    refetch: refetchToday,
  } = useTodayBirthdays();

  const {
    data: currentMonthBirthdays = [],
    isLoading: isLoadingMonth,
    error: errorMonth,
    refetch: refetchMonth,
  } = useCurrentMonthBirthdays();

  const isLoading = isLoadingToday || isLoadingMonth;
  const error = errorToday?.message || errorMonth?.message || null;

  const refetch = () => {
    refetchToday();
    refetchMonth();
  };

  return {
    todayBirthdays,
    currentMonthBirthdays,
    isLoading,
    error,
    refetch,
    hasBirthdaysToday: todayBirthdays.length > 0,
  };
};