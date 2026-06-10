import { useDraggableList } from "@/shared/lib/hooks/use-draggable-list";
import { DraggableList } from "@/shared/ui/draggable-list";
import { Button } from "@/shared/ui/button";
import { OrgItem, type OrgItemType } from "@/entities/org-structure";
import { EmptyPlaceholder } from "@/shared/ui/empty-placeholder";

interface DepartmentsSectionProps {
  items: OrgItemType[];
  onAdd: () => void;
  onEdit: (item: OrgItemType) => void;
  onDelete: (item: OrgItemType) => void;
  onReorder?: (items: OrgItemType[]) => void;
}

export const DepartmentsSection = ({
  items,
  onAdd,
  onEdit,
  onDelete,
  onReorder,
}: DepartmentsSectionProps) => {
  const { orderedItems, handleDragEnd } = useDraggableList(items, onReorder);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="body-m-semibold tracking-[0.15px] text-black">
          Отделы
          <span className="body-m-semibold tracking-[0.15px] text-black">
            ({orderedItems.length})
          </span>
        </h3>
        <Button variant="ghost" className="px-4" onClick={onAdd}>
          <span className="button-small text-purple-400">+ Добавить отдел</span>
        </Button>
      </div>

      <DraggableList items={orderedItems} onDragEnd={handleDragEnd}>
        <div className="space-y-3 flex-col fit-content overflow-y-hidden overflow-x-hidden">
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
