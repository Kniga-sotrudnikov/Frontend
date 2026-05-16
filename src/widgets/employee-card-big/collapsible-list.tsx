import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/collapsible";

import { Badge } from "@/shared/ui/badge";

type Props = {
  items: string[];
};

export function CollapsibleList({ items }: Props) {
  const [open, setOpen] = React.useState(false);

  const visibleItems = items.slice(0, 3);
  const hiddenItems = items.slice(3);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex flex-wrap gap-2 w-full min-w-0">
        {visibleItems.map((item, i) => (
          <Badge
            key={i}
            className="bg-purple-50 text-purple-500 border-purple-500 rounded-4"
          >
            {item}
          </Badge>
        ))}

        <CollapsibleContent asChild>
          <div className="contents">
            {hiddenItems.map((item, i) => (
              <Badge
                key={i}
                className="bg-purple-50 text-purple-500 border-purple-500 rounded-4"
              >
                {item}
              </Badge>
            ))}
          </div>
        </CollapsibleContent>

        {!open && hiddenItems.length > 0 && (
          <CollapsibleTrigger asChild>
            <Badge className="bg-purple-50 text-purple-500 border-purple-500 rounded-4 cursor-pointer">
              {">>"}
            </Badge>
          </CollapsibleTrigger>
        )}
      </div>
    </Collapsible>
  );
}
