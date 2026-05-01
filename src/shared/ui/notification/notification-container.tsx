// src/shared/ui/notification/NotificationContainer.tsx
import { useNotificationStore } from "@/shared/model/stores/use-notification-store";
import { NotificationItem } from "@ui/notification";

export const NotificationContainer = () => {
  const notifications = useNotificationStore((state) => state.notifications);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-[473px]">
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} {...notification} />
      ))}
    </div>
  );
};
