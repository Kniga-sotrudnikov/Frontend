import { useState } from "react";
import { useDraggableRow } from "@/shared/lib/hooks/use-draggable-row";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { ActionsGroup } from "@/shared/ui/actions-group";
import MoreVerticalIcon from "@/shared/assets/icons/more-vertical.svg?react";
import EditIcon from "@/shared/assets/icons/edit.svg?react";
import ArchiveIcon from "@/shared/assets/icons/delete.svg?react";
import GridIcon from "@/shared/assets/icons/grid.svg?react";

export interface OrgItemType {
  id: string;
  name: string;
  headName: string;
  headId?: number | null;
}

interface OrgItemProps {
  item: OrgItemType;
  onEdit: (item: OrgItemType) => void;
  onDelete: (item: OrgItemType) => void;
}

export const OrgItem = ({ item, onEdit, onDelete }: OrgItemProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { ref, style, listeners, attributes } = useDraggableRow(item.id);

  const handleEdit = () => {
    setPopoverOpen(false);
    onEdit(item);
  };

  const handleDelete = () => {
    setPopoverOpen(false);
    onDelete(item);
  };

  const actions = [
    <Popover key="menu" open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="p-0">
          <MoreVerticalIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-42.75 p-0 overflow-hidden"
        align="end"
        sideOffset={-42}
        alignOffset={-12}
      >
        <div className="flex flex-col">
          <Button
            variant="ghost"
            size="default"
            onClick={handleEdit}
            className="flex items-center gap-2 w-full px-4 py-3 rounded-none h-auto body-s text-black hover:bg-gray-100 transition-colors border-0 border-b border-b-gray-200"
          >
            <EditIcon className="size-5" />
            <span>Редактировать</span>
          </Button>
          <Button
            variant="ghost"
            size="default"
            onClick={handleDelete}
            className="flex items-center gap-2 w-full px-4 py-3 rounded-none h-auto body-s text-red-600 hover:bg-gray-100 transition-colors border-0"
          >
            <ArchiveIcon className="size-5" />
            <span>Удалить</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>,
  ];

  return (
    <div
      ref={ref}
      style={style}
      className="flex items-center justify-between py-2.5 px-3 rounded-8 border border-gray-100 bg-white"
    >
      <div className="flex items-center gap-4">
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab active:cursor-grabbing"
        >
          <GridIcon className="size-5 text-gray-500" />
        </div>
        <div className="flex flex-col gap-2.25">
          <span className="button-medium text-gray-900">{item.name}</span>
          <span className="body-s tracking-[0.1px] text-gray-900">
            Руководитель: <span className="button-medium">{item.headName}</span>
          </span>
        </div>
      </div>

      <ActionsGroup actions={actions} />
    </div>
  );
};
