import { useQuery } from "@tanstack/react-query";
import {
  getPublicBirthdaysApi,
  getTodayBirthdaysApi,
  getCurrentMonthBirthdaysApi,
  getUpcomingBirthdaysAdminApi,
  getBirthdaysSettingsApi,
} from "../api/birthdays-api";

export const birthdayKeys = {
  all: ['birthdays'] as const,
  public: () => [...birthdayKeys.all, 'public'] as const,
  today: () => [...birthdayKeys.all, 'today'] as const,
  currentMonth: () => [...birthdayKeys.all, 'current-month'] as const,
  upcoming: () => [...birthdayKeys.all, 'upcoming'] as const,
  settings: () => [...birthdayKeys.all, 'settings'] as const,
};

export const usePublicBirthdays = () => {
  return useQuery({
    queryKey: birthdayKeys.public(),
    queryFn: getPublicBirthdaysApi,
    staleTime: 5 * 60 * 1000,
  });
};

export const useTodayBirthdays = () => {
  return useQuery({
    queryKey: birthdayKeys.today(),
    queryFn: getTodayBirthdaysApi,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCurrentMonthBirthdays = () => {
  return useQuery({
    queryKey: birthdayKeys.currentMonth(),
    queryFn: getCurrentMonthBirthdaysApi,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpcomingBirthdaysAdmin = () => {
  return useQuery({
    queryKey: birthdayKeys.upcoming(),
    queryFn: getUpcomingBirthdaysAdminApi,
    staleTime: 5 * 60 * 1000,
    enabled: false,
  });
};

export const useBirthdaysSettings = () => {
  return useQuery({
    queryKey: birthdayKeys.settings(),
    queryFn: getBirthdaysSettingsApi,
    staleTime: 5 * 60 * 1000,
  });
};