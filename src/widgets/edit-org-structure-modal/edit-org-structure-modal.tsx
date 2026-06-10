import { useState } from "react";
import { useOrgStructureStore } from "@/entities/org-structure";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@ui/dialog";
import { Button } from "@/shared/ui/button";
import { OrgSection } from "./org-section";
import { useNotificationStore } from "@/shared/model/stores";
import type { OrgItem } from "@/entities/org-structure";
import {
  EditDirectionModal,
  type Department,
} from "@/features/edit-direction-modal";

interface EditOrgStructureModalProps {
  children: React.ReactNode;
  onAddDirection?: () => void;
  onAddSis?: () => void;
  // onEditSis?: (item: OrgItem) => void;
  onDeleteDirection?: (item: OrgItem) => void;
  onDeleteSis?: (item: OrgItem) => void;
  onSave?: (data: { directions: OrgItem[]; sisList: OrgItem[] }) => void;
}

export function EditOrgStructureModal({
  children,
  // directions: initialDirections,
  // sisList: initialSisList,
  onAddDirection,
  onAddSis,
  // onEditDirection,
  // onEditSis,
  onDeleteDirection,
  onDeleteSis,
  onSave,
}: EditOrgStructureModalProps) {
  const direction = useOrgStructureStore((state) => state.directions);
  const sisList = useOrgStructureStore((state) => state.sisList);
  const [open, setOpen] = useState(false);
  const [editingDirection, setEditingDirection] = useState<{
    id: string;
    name: string;
    headName: string;
    entityType: "direction" | "sis";
  } | null>(null);

  const [localDirections, setLocalDirections] = useState(direction);
  const [localSisList, setLocalSisList] = useState(sisList);
  const addNotification = useNotificationStore((state) => state.add);

  // TODO Удалить после получения данных с бэка
  const mockDepartments: Department[] = [
    { id: "1", name: "Маркетинг", headName: "Иванова Татьяна Викторовна" },
    { id: "2", name: "Разработка", headName: "Петров Михаил Иванович" },
  ];

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
    setEditingDirection({...item, entityType: "direction"});
  }

  const handleEditSis = (item: OrgItem) => {
    setEditingDirection({ ...item, entityType: "sis" });
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

  const handleSave = () => {
    if (onSave) {
      onSave({ directions: localDirections, sisList: localSisList });
    }
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setLocalDirections(direction);
      setLocalSisList(sisList);
    }
    setOpen(isOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-188! rounded-8 gap-6 px-7 py-8 flex flex-col h-auto">
          <div className="flex items-center justify-between shrink-0">
            <h2 className="body-m-semibold text-black">
              Редактировать оргструктуру
            </h2>
            <DialogClose variant="icon" />
          </div>
  
          <div className="flex flex-col flex-1 gap-6 overflow-y-auto">
            <OrgSection
              title="Направления"
              items={localDirections}
              addButtonText="Добавить направление"
              onAdd={handleAddDirection}
              onEdit={handleEditDirection}
              onDelete={handleDeleteDirection}
              onReorder={setLocalDirections}
            />
            <OrgSection
              title="СИС"
              items={localSisList}
              addButtonText="Добавить СИС"
              onAdd={handleAddSis}
              onEdit={handleEditSis}
              onDelete={handleDeleteSis}
              onReorder={setLocalSisList}
            />
          </div>
  
          <div className="flex justify-end gap-3.75 shrink-0">
            <DialogClose variant="custom" asChild>
              <Button
                variant="ghost"
                size="plain"
                className="button-small px-4 h-8"
              >
                Отмена
              </Button>
            </DialogClose>
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
      <EditDirectionModal
        key={editingDirection?.id ?? "none"}
        open={editingDirection !== null}
        onOpenChange={(isOpen) => !isOpen && setEditingDirection(null)}
        entityType={editingDirection?.entityType}
        initialName={editingDirection?.name ?? ""}
        initialHeadName={editingDirection?.headName ?? ""}
        departments={mockDepartments}
        onSave={() => setEditingDirection(null)}
      />
    </>
  );
}
