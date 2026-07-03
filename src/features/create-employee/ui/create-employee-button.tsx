import { Button } from "@ui/button";
import PlusIcon from "@/shared/assets/icons/plus.svg?react";
import { cn } from "@/shared/lib";

interface CreateEmployeeButtonProps {
  onClick: () => void;
  className?: string;
  hideLabelOnCompact?: boolean;
}

export const CreateEmployeeButton = ({
  onClick,
  className,
  hideLabelOnCompact = false,
}: CreateEmployeeButtonProps) => {
  return (
    <Button
      onClick={onClick}
      aria-label="Добавить карточку"
      className={cn(
        "gap-2 w-[197px] h-[40px] text-xs tracking-[-0.5px] bg-purple-500 hover:bg-purple-600 text-white rounded-[var(--radius-8)]",
        className,
      )}
    >
      <PlusIcon
        className={cn("size-3", hideLabelOnCompact && "max-[1100px]:size-4")}
      />
      <span className={hideLabelOnCompact ? "max-[1100px]:sr-only" : ""}>
        Добавить карточку
      </span>
    </Button>
  );
};
