import type { ReactNode } from "react";

interface ActionItemProps {
  actions: ReactNode[];
  className?: string;
}

export const ActionsGroup = ({ actions, className = "" }: ActionItemProps) => {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {actions.map((action, index) => (
        <div key={index}>{action}</div>
      ))}
    </div>
  );
};
