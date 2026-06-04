import { useNotificationStore } from "@/shared/model/stores/use-notification-store";
import type { Notification } from "@/shared/model/stores/use-notification-store";
import SuccessIcon from "@/shared/assets/icons/toast-2.svg";
import CakeIcon from "@/shared/assets/icons/birthday.svg";
import WarningIcon from "@/shared/assets/icons/warning.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import { Button } from "@ui/button";

const iconMap: Record<string, string> = {
  success: SuccessIcon,
  birthday: CakeIcon,
  warning: WarningIcon
};

// Маппинг стилей кнопок в зависимости от label
const buttonStylesMap: Record<string, string> = {
  "Добавить еще":
    "bg-purple-500 border-purple-500 text-white hover:bg-purple-400 hover:text-white",
};

const getButtonStyles = (label: string): string => {
  return (
    buttonStylesMap[label] ||
    "bg-white border-purple-500 text-black hover:bg-purple-100"
  );
};

export const NotificationItem = ({
  id,
  iconType,
  title,
  message,
  actions,
}: Notification) => {
  const remove = useNotificationStore((state) => state.remove);

  const iconSrc = iconType && iconMap[iconType] ? iconMap[iconType] : iconMap.success;
  const hasButtons = actions && actions.length > 0;

  const handleClose = () => {
    remove(id);
  };

  return (
    <div className="w-118.25 h-31 p-6 bg-purple-100 rounded-16  overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex gap-4 flex-1">
          <img src={iconSrc} alt="" className="w-6 h-6 shrink-0" />
          <div className="flex-1">
            <h4 className="body-m-semibold text-black wrap-break-word line-clamp-2 max-w-88">
              {title}
            </h4>
            {message && !hasButtons && (
              <p className="text-black body-s wrap-break-word line-clamp-1 mt-2">
                {message}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={handleClose}
          className="shrink-0 text-gray-900"
          aria-label="Закрыть"
        >
          <img src={CloseIcon} alt="" className="w-4 h-4" />
        </button>
      </div>

      {hasButtons && (
        <div className="flex gap-3 pl-10 mt-4.75">
          {actions.map((action, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="default"
              onClick={() => {
                action.onClick();
                remove(id);
              }}
              className={`px-3.75 ${getButtonStyles(action.label)}`}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
