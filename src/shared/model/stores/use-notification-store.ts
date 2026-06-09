import { create } from "zustand";

export type NotificationType = "success" | "error" | "info" | "warning";
export type IconType = "success" | "birthday" | "warning" | "error";
export interface Notification {
  id: string;
  type?: NotificationType;
  iconType?: IconType;
  title: string;
  message?: string;
  actions?: Array<{ label: string; onClick: () => void }>;
  duration?: number; // Время до авто-закрытия (мс), 0 = не закрывать
  timeoutId?: number;
}
interface NotificationStore {
  notifications: Notification[];
  add: (notification: Omit<Notification, "id">) => void;
  remove: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],

  add: (notification) => {
    const id = crypto.randomUUID();

    let timeoutId;

    if (notification.duration !== 0) {
      timeoutId = setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
      }, notification.duration || 4000);
    }

    const newNotification = { ...notification, id, timeoutId };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));
  },

  remove: (id) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === id);

      if (notification?.timeoutId) {
        clearTimeout(notification.timeoutId);
      }

      return {
        notifications: state.notifications.filter((n) => n.id !== id),
      };
    }),

  clearAll: () =>
    set((state) => {
      state.notifications.forEach((n) => {
        if (n.timeoutId) {
          clearTimeout(n.timeoutId);
        }
      });

      return { notifications: [] };
    }),
}));
