import { useState, useEffect } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
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
  const [orderedItems, setOrderedItems] = useState(items);

  useEffect(() => {
    setOrderedItems(items);
  }, [items]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = orderedItems.findIndex((item) => item.id === active.id);
      const newIndex = orderedItems.findIndex((item) => item.id === over?.id);
      const newItems = arrayMove(orderedItems, oldIndex, newIndex);

      setOrderedItems(newItems);

      onReorder?.(newItems);
    }
  };

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

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={orderedItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3 flex-col fit-content overflow-y-hidden overflow-x-hidden">
            {orderedItems.map((item) => (
              <OrgItem
                key={item.id}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {orderedItems.length === 0 && (
              <EmptyPlaceholder text="Нет данных" />
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
