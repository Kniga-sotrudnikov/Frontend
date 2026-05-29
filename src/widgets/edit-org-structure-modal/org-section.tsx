import { useDraggableList } from "@/shared/lib/hooks/use-draggable-list";
import { DraggableList } from "@/shared/ui/draggable-list";
import { Button } from "@/shared/ui/button";
import { OrgItem } from "./org-item";
import { EmptyPlaceholder } from "@/shared/ui/empty-placeholder";

interface OrgItem {
  id: string;
  name: string;
  headName: string;
}

interface OrgSectionProps {
  title: string;
  items: OrgItem[];
  addButtonText: string;
  onAdd: () => void;
  onEdit: (item: OrgItem) => void;
  onDelete: (item: OrgItem) => void;
  onReorder?: (items: OrgItem[]) => void;
}

export const OrgSection = ({
  title,
  items,
  addButtonText,
  onAdd,
  onEdit,
  onDelete,
  onReorder,
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
