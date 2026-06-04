import ToastIcon from "@icons/toast.svg?react";
import { useEffect, useState } from "react";

type TLinkSentNoticeProps = {
  email: string;
  expiresAt: number;
  onComplete: () => void;
};

const getSecondsLeft = (expiresAt: number) =>
  Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));

export const LinkSentNotice = ({
  email,
  expiresAt,
  onComplete,
}: TLinkSentNoticeProps) => {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    getSecondsLeft(expiresAt),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const nextSecondsLeft = getSecondsLeft(expiresAt);

      setSecondsLeft(nextSecondsLeft);

      if (nextSecondsLeft <= 0) {
        clearInterval(timer);
        onComplete();
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [expiresAt, onComplete]);

  if (secondsLeft <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col bg-(--color-green-100) p-2 mt-6.5 rounded-8">
      <div className="flex items-center gap-2">
        <ToastIcon className="shrink-0 text-(--color-green-700)" />
        <span className="text-(--color-green-700) button-small">
          {`Письмо отправлено на ${email}`}
        </span>
      </div>
      <span className="text-(--color-green-700) self-start pl-8">
        {`Отправить еще раз (${secondsLeft} с)`}
      </span>
    </div>
  );
};
