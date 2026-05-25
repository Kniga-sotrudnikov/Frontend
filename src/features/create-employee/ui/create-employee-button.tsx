import { Button } from "@ui/button";
import PlusIcon from "@/shared/assets/icons/plus.svg?react";

interface CreateEmployeeButtonProps {
  onClick: () => void;
}

export const CreateEmployeeButton = ({ onClick }: CreateEmployeeButtonProps) => {
  return (
    <Button onClick={onClick} className="gap-2">
      <PlusIcon className="size-4" />
      Добавить карточку
    </Button>
  );
};