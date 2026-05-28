import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@ui/dialog";
import { Button } from "@/shared/ui/button";
import { OrgSection } from "./org-section";
import { useNotificationStore } from "@/shared/model/stores";

interface OrgItem {
  id: string;
  name: string;
  headName: string;
}

interface EditOrgStructureModalProps {
  children: React.ReactNode;
  directions: OrgItem[];
  sisList: OrgItem[];
  onAddDirection?: () => void;
  onAddSis?: () => void;
  onEditDirection?: (item: OrgItem) => void;
  onEditSis?: (item: OrgItem) => void;
  onDeleteDirection?: (item: OrgItem) => void;
  onDeleteSis?: (item: OrgItem) => void;
  onSave?: () => void;
}

export function EditOrgStructureModal({
  children,
  directions,
  sisList,
  onAddDirection,
  onAddSis,
  onEditDirection,
  onEditSis,
  onDeleteDirection,
  onDeleteSis,
  onSave,
}: EditOrgStructureModalProps) {
  const [open, setOpen] = useState(false);
  const addNotification = useNotificationStore((state) => state.add);

  const showDevNotification = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Функция будет доступна в ближайшее время",
    });
  };

  const handleAddDirection = () => {
    if (onAddDirection) {
      onAddDirection();
    } else {
      showDevNotification();
    }
  };

  const handleAddSis = () => {
    if (onAddSis) {
      onAddSis();
    } else {
      showDevNotification();
    }
  };

  const handleEditDirection = (item: OrgItem) => {
    if (onEditDirection) {
      onEditDirection(item);
    } else {
      showDevNotification();
    }
  };

  const handleEditSis = (item: OrgItem) => {
    if (onEditSis) {
      onEditSis(item);
    } else {
      showDevNotification();
    }
  };

  const handleDeleteDirection = (item: OrgItem) => {
    if (onDeleteDirection) {
      onDeleteDirection(item);
    } else {
      showDevNotification();
    }
  };

  const handleDeleteSis = (item: OrgItem) => {
    if (onDeleteSis) {
      onDeleteSis(item);
    } else {
      showDevNotification();
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-188! rounded-8 gap-6 px-7 py-8 flex flex-col h-auto max-h-237">
        <div className="flex items-center justify-between shrink-0">
          <h2 className="body-m-semibold text-black">
            Редактировать оргструктуру
          </h2>
          <DialogClose variant="icon" onClick={handleCancel} />
        </div>

        <div className="flex flex-col flex-1 gap-6 overflow-auto">
          <OrgSection
            title="Направления"
            items={directions}
            addButtonText="Добавить направление"
            onAdd={handleAddDirection}
            onEdit={handleEditDirection}
            onDelete={handleDeleteDirection}
          />
          <OrgSection
            title="СИС"
            items={sisList}
            addButtonText="Добавить СИС"
            onAdd={handleAddSis}
            onEdit={handleEditSis}
            onDelete={handleDeleteSis}
          />
        </div>

        <div className="flex justify-end gap-3.75 shrink-0">
          <Button
            variant="ghost"
            size="plain"
            className="button-small px-4 h-8"
            onClick={handleCancel}
          >
            Отмена
          </Button>
          <Button
            variant="default"
            size="plain"
            className="button-small px-4 h-8"
            onClick={handleSave}
          >
            Готово
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
