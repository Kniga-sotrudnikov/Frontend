import { useState, useEffect, useCallback } from "react";
import {
  getTodayBirthdaysApi,
  getCurrentMonthBirthdaysApi,
  type BirthdayPerson,
} from "@/entities/employee";

interface UseBirthdaysReturn {
  todayBirthdays: BirthdayPerson[];
  currentMonthBirthdays: BirthdayPerson[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  hasBirthdaysToday: boolean;
}

export const useBirthdays = (): UseBirthdaysReturn => {
  const [todayBirthdays, setTodayBirthdays] = useState<BirthdayPerson[]>([]);
  const [currentMonthBirthdays, setCurrentMonthBirthdays] = useState<BirthdayPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBirthdays = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [today, month] = await Promise.all([
        getTodayBirthdaysApi(),
        getCurrentMonthBirthdaysApi(),
      ]);
      setTodayBirthdays(today);
      setCurrentMonthBirthdays(month);
    } catch (err) {
      setError("Не удалось загрузить данные о днях рождения");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBirthdays();
  }, [fetchBirthdays]);

  return {
    todayBirthdays,
    currentMonthBirthdays,
    isLoading,
    error,
    refetch: fetchBirthdays,
    hasBirthdaysToday: todayBirthdays.length > 0,
  };
};