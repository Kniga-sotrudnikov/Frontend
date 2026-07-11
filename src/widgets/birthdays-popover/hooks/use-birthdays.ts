import { usePublicBirthdays } from "@/entities/employee";
import type { BirthdayPerson } from "@/entities/employee";

interface UseBirthdaysReturn {
  todayBirthdays: BirthdayPerson[];
  currentMonthBirthdays: BirthdayPerson[];
  isLoading: boolean;
  error: string | null;
  hasBirthdaysToday: boolean;
}

export const useBirthdays = (): UseBirthdaysReturn => {
  const { data: allBirthdays = [], isLoading, error } = usePublicBirthdays();

  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  const todayBirthdays = allBirthdays.filter(
    (b) => b.fullDate.getMonth() === todayMonth && b.fullDate.getDate() === todayDay,
  );

  const currentMonthBirthdays = allBirthdays.filter(
    (b) => b.fullDate.getMonth() === todayMonth,
  );

  return {
    todayBirthdays,
    currentMonthBirthdays,
    isLoading,
    error: error?.message ?? null,
    hasBirthdaysToday: todayBirthdays.length > 0,
  };
};