import { create } from "zustand";

export type NotificationType = "success" | "error" | "info" | "warning";
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  actions?: Array<{ label: string; onClick: () => void }>;
  duration?: number; // Время до авто-закрытия (мс), 0 = не закрывать
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
    const newNotification = { ...notification, id };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

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
