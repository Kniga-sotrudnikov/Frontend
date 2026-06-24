import { apiClient } from "@/shared/api/client";
import type { BirthdayPerson } from "../model/mock";

interface PublicBirthdayResponse {
  id: number;
  full_name: string;
  birthday: string;
  department_name?: string;
  job_title?: string;
  photo_url?: string;
}

interface AdminBirthdayResponse {
  id: number;
  full_name: string;
  birthday: string;
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

const mapApiToBirthday = (data: PublicBirthdayResponse | AdminBirthdayResponse): BirthdayPerson => {
  const date = new Date(data.birthday);
  const monthNames = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];
  
  return {
    name: data.full_name,
    date: `${date.getDate()} ${monthNames[date.getMonth()]}`,
    fullDate: date,
  };
};

export const getPublicBirthdaysApi = async (): Promise<BirthdayPerson[]> => {
  try {
    const response = await apiClient.get<PublicBirthdayResponse[]>('/employees/birthdays/');
    return response.data.map(mapApiToBirthday);
  } catch (error) {
    console.error('Ошибка при получении дней рождения:', error);
    return [];
  }
};

export const getCurrentMonthBirthdaysApi = async (): Promise<BirthdayPerson[]> => {
  try {
    const allBirthdays = await getPublicBirthdaysApi();
    const currentMonth = new Date().getMonth();
    
    return allBirthdays.filter(
      (birthday) => birthday.fullDate.getMonth() === currentMonth
    );
  } catch (error) {
    console.error('Ошибка при получении дней рождения за месяц:', error);
    return [];
  }
};

export const getTodayBirthdaysApi = async (): Promise<BirthdayPerson[]> => {
  try {
    const allBirthdays = await getPublicBirthdaysApi();
    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
    
    return allBirthdays.filter((birthday) => {
      return birthday.fullDate.getMonth() === todayMonth && 
             birthday.fullDate.getDate() === todayDay;
    });
  } catch (error) {
    console.error('Ошибка при получении дней рождения на сегодня:', error);
    return [];
  }
};

export const getUpcomingBirthdaysAdminApi = async (): Promise<BirthdayPerson[]> => {
  try {
    const response = await apiClient.get<AdminBirthdayResponse[]>('/admin/birthdays/upcoming/');
    return response.data.map(mapApiToBirthday);
  } catch (error) {
    console.error('Ошибка при получении предстоящих дней рождения (admin):', error);
    return [];
  }
};

export const getBirthdaysSettingsApi = async (): Promise<BirthdaySettings | null> => {
  try {
    const response = await apiClient.get<BirthdaySettings>('/admin/birthdays/settings/');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении настроек дней рождения:', error);
    return null;
  }
};

export const updateBirthdaysSettingsApi = async (
  data: BirthdaySettingsUpdate
): Promise<BirthdaySettings> => {
  try {
    const response = await apiClient.patch<BirthdaySettings>('/admin/birthdays/settings/', data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении настроек дней рождения:', error);
    throw error;
  }
};