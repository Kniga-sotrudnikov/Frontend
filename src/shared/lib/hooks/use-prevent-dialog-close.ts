import { useCallback } from "react";

export const usePreventDialogClose = () => {
  return useCallback((e: Event) => {
    const target = e.target as HTMLElement;

    if (
      target.closest('[role="combobox"]') ||
      target.closest('[role="option"]') ||
      target.closest('[data-state="open"]')
    ) {
      e.preventDefault();
    }
  }, []);
};
