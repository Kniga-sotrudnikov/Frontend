import { useQuery } from "@tanstack/react-query";
import {
  getPublicBirthdaysApi,
} from "../api/birthdays-api";

export const usePublicBirthdays = () => {
  return useQuery({
    queryKey: ["public-birthdays-query-key"],
    queryFn: getPublicBirthdaysApi,
  });
};