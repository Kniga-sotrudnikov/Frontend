import { Button } from "@ui/button";
import PlusIcon from "@/shared/assets/icons/plus.svg?react";

interface CreateEmployeeButtonProps {
  onClick: () => void;
}

export const CreateEmployeeButton = ({ onClick }: CreateEmployeeButtonProps) => {
  return (
    <Button onClick={onClick} className="gap-2 w-[197px] h-[32px] text-xs tracking-[-0.5px] bg-purple-500 hover:bg-purple-600 text-white rounded-[var(--radius-8)">
      <PlusIcon className="size-3" />
      Добавить карточку
    </Button>
  );
};