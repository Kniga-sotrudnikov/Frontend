import { useDraggableList } from "@/shared/lib/hooks/use-draggable-list";
import { DraggableList } from "@/shared/ui/draggable-list";
import { Button } from "@/shared/ui/button";
import { OrgItem, type OrgItemType } from "./org-item";

import { EmptyPlaceholder } from "@/shared/ui/empty-placeholder";

interface OrgSectionProps {
  title: string;
  items: OrgItemType[];
  addButtonText: string;
  onAdd: () => void;
  onEdit: (item: OrgItemType) => void;
  onDelete: (item: OrgItemType) => void;
  onReorder?: (items: OrgItemType[]) => void;
  children?: React.ReactNode;
}

export const OrgSection = ({
  title,
  items,
  addButtonText,
  onAdd,
  onEdit,
  onDelete,
  onReorder,
  children,
}: OrgSectionProps) => {
  const { orderedItems, handleDragEnd } = useDraggableList(items, onReorder);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="body-m-semibold tracking-[0.15px] text-black">
          {title}
          <span className="body-m-semibold tracking-[0.15px] text-black">
            ({orderedItems.length})
          </span>
        </h3>
        <Button variant="ghost" className="px-4" onClick={onAdd}>
          <span className="button-small text-purple-400">{`+ ${addButtonText}`}</span>
        </Button>
      </div>

      {children && <div className="mb-6">{children}</div>}

      <DraggableList items={orderedItems} onDragEnd={handleDragEnd}>
        <div className="space-y-3  flex-col fit-content overflow-y-hidden overflow-x-hidden">
          {orderedItems.map((item) => (
            <OrgItem
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
          {orderedItems.length === 0 && <EmptyPlaceholder text="Нет данных" />}
        </div>
      </DraggableList>
    </div>
  );
};
