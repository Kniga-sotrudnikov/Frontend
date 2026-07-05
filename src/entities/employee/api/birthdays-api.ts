import { apiClient } from "@/shared/api/client";
import type { BirthdayPerson } from "../model/mock";

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

interface BirthdaySettings {
  id?: number;
  is_enabled?: boolean;
  notification_days_before?: number;
}

interface BirthdaySettingsUpdate {
  is_enabled?: boolean;
  notification_days_before?: number;
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

export const getCurrentMonthBirthdaysApi = async (): Promise<BirthdayPerson[]> => {
  const allBirthdays = await getPublicBirthdaysApi();
  const currentMonth = new Date().getMonth();
  return allBirthdays.filter((birthday) => birthday.fullDate.getMonth() === currentMonth);
};

export const getTodayBirthdaysApi = async (): Promise<BirthdayPerson[]> => {
  const allBirthdays = await getPublicBirthdaysApi();
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();
  return allBirthdays.filter((birthday) => {
    return birthday.fullDate.getMonth() === todayMonth && 
           birthday.fullDate.getDate() === todayDay;
  });
};

export const getUpcomingBirthdaysAdminApi = async (): Promise<BirthdayPerson[]> => {
  const response = await apiClient.get<AdminBirthdayResponse[]>('/admin/birthdays/upcoming/');
  return response.data
    .map(mapApiToBirthday)
    .filter((item): item is BirthdayPerson => item !== null);
};

export const getBirthdaysSettingsApi = async (): Promise<BirthdaySettings> => {
  const response = await apiClient.get<BirthdaySettings>('/admin/birthdays/settings/');
  return response.data;
};

export const updateBirthdaysSettingsApi = async (
  data: BirthdaySettingsUpdate
): Promise<BirthdaySettings> => {
  const response = await apiClient.patch<BirthdaySettings>('/admin/birthdays/settings/', data);
  return response.data;
};