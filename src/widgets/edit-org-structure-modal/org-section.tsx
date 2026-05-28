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
}

export const OrgSection = ({
  title,
  items,
  addButtonText,
  onAdd,
  onEdit,
  onDelete,
}: OrgSectionProps) => {
  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h3 className="body-m-semibold tracking-[0.15px] text-black">
          {title}
          <span className="body-m-semibold tracking-[0.15px] text-black">
            ({items.length})
          </span>
        </h3>
        <Button variant="ghost" className="px-4" onClick={onAdd}>
          <span className="button-small text-purple-400">{`+ ${addButtonText}`}</span>
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <OrgItem
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {items.length === 0 && <EmptyPlaceholder text="Нет данных" />}
      </div>
    </div>
  );
};
