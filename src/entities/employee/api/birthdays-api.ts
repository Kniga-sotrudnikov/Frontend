import { apiClient } from "@/shared/api/client";
import type { BirthdayPerson } from "../model/types";

interface PublicBirthdayResponse {
  id: number;
  full_name: string;
  birthday_display: string;
  department_name?: string;
  job_title?: string;
  photo_url?: string;
}

interface AdminBirthdayResponse {
  id: number;
  full_name: string;
  birthday_display: string;
  department_name: string;
  job_title: string;
  email: string;
  phone?: string;
}

const monthNames = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

const mapApiToBirthday = (data: PublicBirthdayResponse | AdminBirthdayResponse): BirthdayPerson | null => {
  try {
    const parts = data.birthday_display.split('.');
    if (parts.length !== 2) {
      return null;
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;

    if (isNaN(day) || isNaN(month) || day < 1 || day > 31 || month < 0 || month > 11) {
      return null;
    }

    const currentYear = new Date().getFullYear();
    const date = new Date(currentYear, month, day);

    if (isNaN(date.getTime())) {
      return null;
    }

    return {
      name: data.full_name,
      date: `${day} ${monthNames[month]}`,
      fullDate: date,
    };
  } catch {
    return null;
  }
};

export const getPublicBirthdaysApi = async (): Promise<BirthdayPerson[]> => {
  const response = await apiClient.get<PublicBirthdayResponse[]>('/employees/birthdays/');
  return response.data
    .map(mapApiToBirthday)
    .filter((item): item is BirthdayPerson => item !== null);
};