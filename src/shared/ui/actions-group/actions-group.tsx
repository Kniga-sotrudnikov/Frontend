import type { ReactNode } from "react";

interface ActionsGroupProps {
  actions: ReactNode[];
  className?: string;
}

export const ActionsGroup = ({
  actions,
  className = "",
}: ActionsGroupProps) => {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {actions.map((action, index) => (
        <div key={index}>{action}</div>
      ))}
    </div>
  );
};
