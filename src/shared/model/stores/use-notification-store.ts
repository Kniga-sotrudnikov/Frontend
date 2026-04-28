import { create } from "zustand";

// Типы уведомлений. Возможно надо будет изменить.
// Предпологается, что от них будет зависеть иконка и цвет(?) уведомления
export type NotificationType = "success" | "error" | "info" | "warning";

// Интерфейс одного уведомления
export interface Notification {
  id: string;
  type: NotificationType;
  title: string; //У марии день рождения | Карточка сотрудника создана
  message?: string; //Не забудьте поздравить
  actions?: Array<{ label: string; onClick: () => void }>; //Кнопки опционально
  duration?: number; // Время до авто-закрытия (мс), 0 = не закрывать
}

// Интерфейс стора
interface NotificationStore {
  notifications: Notification[];
  add: (notification: Omit<Notification, "id">) => void; // Тип Notification но без id, т.к. он генерируется внутри add
  remove: (id: string) => void;
  clearAll: () => void;
}

// Создаём стор
export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  add: (notification) => {
    const id = crypto.randomUUID();
    const newNotification = { ...notification, id };

    // Добавляем уведомление
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Авто-удаление (если duration не 0)
    if (notification.duration !== 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, notification.duration || 4000);
    }
  },

  remove: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearAll: () => set({ notifications: [] }),
}));
