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
    <div className="flex justify-between px-2 py-1">
      <img
        src={photo}
        alt="фотография сотрудника"
        width="36"
        height="36"
        className="block shrink-0"
      />
      <div className="flex flex-col">
        <span>{name}</span>
        <span>{job}</span>
      </div>
      <Button>
        <TrashIcon />
      </Button>
    </div>
  );
};
