import { useCallback } from "react";

/**
 * Предотвращает закрытие диалога при клике внутри его видимой области,
 * когда поверх открыт дропдаун (Select, модальный Popover).
 *
 * Такие дропдауны выставляют контенту диалога `pointer-events: none`
 * (disableOutsidePointerEvents в Radix DismissableLayer), поэтому клик
 * «внутри окна, но вне дропдауна» проваливается сквозь контент на оверлей
 * и засчитывается диалогом как клик снаружи — диалог закрывается вместе
 * с дропдауном. Определяем этот случай по координатам: цель события —
 * не контент диалога, но точка клика попадает в его видимые границы.
 *
 * Клик по затемнённой области вне окна по-прежнему закрывает диалог.
 */
export const usePreventDialogCloseOnPassthrough = () => {
  return useCallback((event: Event) => {
    const originalEvent = (event as CustomEvent<{ originalEvent?: unknown }>)
      .detail?.originalEvent;

    if (!(originalEvent instanceof PointerEvent)) return;

    const target = originalEvent.target;
    if (!(target instanceof Element) || target.closest('[role="dialog"]')) {
      return;
    }

    const portal = target.closest('[data-slot="dialog-portal"]');
    const dialogs = portal
      ? portal.querySelectorAll('[role="dialog"]')
      : document.querySelectorAll('[role="dialog"][data-state="open"]');

    const { clientX, clientY } = originalEvent;

    for (const dialog of dialogs) {
      const rect = dialog.getBoundingClientRect();
      const isInsideDialog =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isInsideDialog) {
        event.preventDefault();
        return;
      }
    }
  }, []);
};
