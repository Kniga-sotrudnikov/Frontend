import { Button } from "@ui/button";

import TrashIcon from "@icons/trash.svg?react";

type TSelectedEmployeeProps = {
  name: string;
  job: string;
  photo: string;
  onDelete: () => void;
};

export const SelectedEmployee = ({
  name,
  job,
  photo,
}: Partial<TSelectedEmployeeProps>) => {
  return (
    <div className="flex justify-between items-center px-2 py-1 min-w-53 bg-(--color-gray-50) rounded-(--radius-4)">
      <img
        src={photo}
        alt="фотография сотрудника"
        width="36"
        height="36"
        className="w-9 h-9 rounded-full object-cover border-2 border-(--color-white)"
      />
      <div className="flex flex-col gap-1">
        <span className="body-overline">{name}</span>
        <span className="body-overline text-(--color-gray-600)">{job}</span>
      </div>
      <Button variant="ghost" size="icon-md">
        <TrashIcon />
      </Button>
    </div>
  );
};
