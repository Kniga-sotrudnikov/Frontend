import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface DraggableListProps {
  items: Array<{ id: string }>;
  onDragEnd: (event: DragEndEvent) => void;
  children: React.ReactNode;
}

export const DraggableList = ({
  items,
  onDragEnd,
  children,
}: DraggableListProps) => {
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};
