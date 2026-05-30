import { Button } from "@ui/button";
import { Badge } from "@ui/badge";

import CloseIcon from "@icons/close.svg?react";

type TFilterRemoveBadgeProps = {
  label: string;
  onRemove: () => void;
};

export const FilterRemoveBadge = ({
  label,
  onRemove,
}: TFilterRemoveBadgeProps) => {
  return (
    <Badge className="inline-flex items-center gap-1 bg-(--color-purple-100)">
      <span className="block leading-none text-(--color-purple-800)">
        {label}
      </span>
      <Button variant="plain" size="plain" onClick={onRemove}>
        <CloseIcon className="size-3" />
      </Button>
    </Badge>
  );
};
