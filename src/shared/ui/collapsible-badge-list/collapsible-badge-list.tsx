import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";

import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib";

type CollapsibleBadgeListProps = {
  items: string[];
  badgeClassName?: string;
  visibleCount?: number;
};

export function CollapsibleBadgeList({
  items,
  badgeClassName,
  visibleCount,
}: CollapsibleBadgeListProps) {
  const [open, setOpen] = useState(false);

  if (visibleCount === undefined) {
    return (
      <div className="flex flex-wrap gap-2 w-full min-w-0">
        {items.map((item, i) => (
          <Badge key={i} className={cn("rounded-4", badgeClassName)}>
            {item}
          </Badge>
        ))}
      </div>
    );
  }

  const visibleItems = items.slice(0, visibleCount);
  const hiddenItems = items.slice(visibleCount);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex flex-wrap gap-2 w-full min-w-0">
        {visibleItems.map((item, i) => (
          <Badge key={i} className={cn("rounded-4", badgeClassName)}>
            {item}
          </Badge>
        ))}

        <CollapsibleContent asChild>
          <div className="contents">
            {hiddenItems.map((item, i) => (
              <Badge key={i} className={cn("rounded-4", badgeClassName)}>
                {item}
              </Badge>
            ))}
          </div>
        </CollapsibleContent>

        {!open && hiddenItems.length > 0 && (
          <CollapsibleTrigger asChild>
            <Badge className={cn("rounded-4 cursor-pointer", badgeClassName)}>
              {">>"}
            </Badge>
          </CollapsibleTrigger>
        )}
      </div>
    </Collapsible>
  );
}
