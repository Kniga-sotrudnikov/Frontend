import { useQuery } from "@tanstack/react-query";
import {
  getPublicBirthdaysApi,
  getUpcomingBirthdaysAdminApi,
  getBirthdaysSettingsApi,
} from "../api/birthdays-api";

export const birthdayKeys = {
  all: ['birthdays'] as const,
  public: () => [...birthdayKeys.all, 'public'] as const,
  upcoming: () => [...birthdayKeys.all, 'upcoming'] as const,
  settings: () => [...birthdayKeys.all, 'settings'] as const,
};

export const usePublicBirthdays = () => {
  return useQuery({
    queryKey: ["public-birthdays-query-key"],
    queryFn: getPublicBirthdaysApi,
  });
};

export const useUpcomingBirthdaysAdmin = () => {
  return useQuery({
    queryKey: birthdayKeys.upcoming(),
    queryFn: getUpcomingBirthdaysAdminApi,
    enabled: false,
  });
};

export const useBirthdaysSettings = () => {
  return useQuery({
    queryKey: birthdayKeys.settings(),
    queryFn: getBirthdaysSettingsApi,
  });
};