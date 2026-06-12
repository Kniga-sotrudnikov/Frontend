import { Button } from "@ui/button";
import PlusIcon from "@/shared/assets/icons/plus.svg?react";
import { cn } from "@/shared/lib";

interface CreateEmployeeButtonProps {
  onClick: () => void;
  className?: string;
}

export const CreateEmployeeButton = ({
  onClick,
  className,
}: CreateEmployeeButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "gap-2 w-[197px] h-[40px] text-xs tracking-[-0.5px] bg-purple-500 hover:bg-purple-600 text-white rounded-[var(--radius-8)]",
        className,
      )}
    >
      <PlusIcon className="size-3" />
      Добавить карточку
    </Button>
  );
};
