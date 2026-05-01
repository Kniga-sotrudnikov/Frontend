import { useNotificationStore } from "@/shared/model/stores/use-notification-store";
import type { Notification } from "@/shared/model/stores/use-notification-store";
import SuccessIcon from "@/shared/assets/icons/toast-2.svg";
import CakeIcon from "@/shared/assets/icons/birthday.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";

const iconMap: Record<string, string> = {
  success: SuccessIcon,
  birthday: CakeIcon,
};

export const NotificationItem = ({
  id,
  iconType,
  title,
  message,
  actions,
}: Notification) => {
  const remove = useNotificationStore((state) => state.remove);

  const iconSrc = iconMap[iconType] || iconMap.success;
  const hasButtons = actions && actions.length > 0;

  const handleClose = () => {
    remove(id);
  };

  return (
    <div className="w-[473px] h-[124px] p-6 bg-purple-100 rounded-16 shadow-lg border border-gray-200 overflow-hidden">
      <div className="flex items-start justify-between ">
        <div className="flex items-center gap-3 flex-1">
          <img src={iconSrc} alt="" className="w-5 h-5 mt-0.5" />
          <h4 className="body-m-semibold text-sm text-black break-words line-clamp-2 flex-1">
            {title}
          </h4>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors ml-2"
          aria-label="Закрыть"
        >
          <img src={CloseIcon} alt="" className="w-4 h-4" />
        </button>
      </div>

      <div className="px-4 pb-4 pt-1">
        {message && !hasButtons && (
          <p className="text-black body-s break-words line-clamp-2">
            {message}
          </p>
        )}

        {hasButtons && (
          <div className="flex gap-3">
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => {
                  action.onClick();
                  remove(id);
                }}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
