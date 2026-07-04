import { useState, useMemo, useEffect } from "react";
import {
  useOrgStructure,
  getDirections,
  getSisList,
  OrgSection,
  type OrgItemType,
  useDeleteDepartment,
} from "@/entities/org-structure";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@ui/dialog";
import { Button } from "@/shared/ui/button";
import { useNotificationStore } from "@/shared/model/stores";
import {
  EditDirectionModal,
  type Department,
  type DirectionFormValues,
} from "@/features/edit-direction-modal";
import {
  CreateDirectionModal,
  type CreateDirectionFormValues,
} from "@/features/create-direction-modal";

interface EditOrgStructureModalProps {
  children: React.ReactNode;
  onAddDirection?: () => void;
  onAddSis?: () => void;
  onDeleteDirection?: (item: OrgItemType) => void;
  onDeleteSis?: (item: OrgItemType) => void;
}

export function EditOrgStructureModal({
  children,
  onAddDirection,
  onAddSis,
  onDeleteDirection,
  onDeleteSis,
}: EditOrgStructureModalProps) {
  const { data: tree = [] } = useOrgStructure();
  const directions = useMemo(() => getDirections(tree), [tree]);
  const sisList = useMemo(() => getSisList(tree), [tree]);

  const [open, setOpen] = useState(false);
  const [editingDirection, setEditingDirection] = useState<{
    id: string;
    name: string;
    headName: string;
    entityType: "direction" | "sis";
    departmentId?: number;
  } | null>(null);
  const [creatingEntityType, setCreatingEntityType] = useState<
    "direction" | "sis" | null
  >(null);

  const [localDirections, setLocalDirections] = useState<OrgItemType[]>([]);
  const [localSisList, setLocalSisList] = useState<OrgItemType[]>([]);
  const addNotification = useNotificationStore((state) => state.add);

  const deleteDepartment = useDeleteDepartment();

  useEffect(() => {
    setLocalDirections(directions);
  }, [directions]);

  useEffect(() => {
    setLocalSisList(sisList);
  }, [sisList]);

  const getDepartmentsForEntity = useMemo(() => {
    return (entityId?: string): Department[] => {
      const targetNode = tree.find((unit) => String(unit.id) === entityId);

      if (!targetNode?.items) return [];

      return targetNode.items.map(
        (item): Department => ({
          id: String(item.id || ""),
          name: item.name,
          headName: "",
        }),
      );
    };
  }, [tree]);

  const handleAddDirection = () => {
    if (onAddDirection) {
      onAddDirection();
    } else {
      setCreatingEntityType("direction");
    }
  };

  const handleAddSis = () => {
    if (onAddSis) {
      onAddSis();
    } else {
      setCreatingEntityType("sis");
    }
  };

  const handleCreate = (values: CreateDirectionFormValues) => {
    if (!creatingEntityType) return;

    const created: OrgItemType = {
      id: crypto.randomUUID(),
      name: values.name,
      headName: values.headName,
    };

    if (creatingEntityType === "direction") {
      setLocalDirections((items) => [...items, created]);
    } else {
      setLocalSisList((items) => [...items, created]);
    }

    setCreatingEntityType(null);
    addNotification({
      iconType: "success",
      title: "Создано",
      message: `«${values.name}» добавлено`,
    });
  };

  const handleEditDirection = (item: OrgItemType) => {
    setEditingDirection({
      ...item,
      entityType: "direction",
      departmentId: Number(item.id) || undefined,
    });
  };

  const handleEditSis = (item: OrgItemType) => {
    setEditingDirection({
      ...item,
      entityType: "sis",
      departmentId: Number(item.id) || undefined,
    });
  };

  const handleDeleteDirection = async (item: OrgItemType) => {
    if (onDeleteDirection) {
      onDeleteDirection(item);
      return;
    }

    const departmentId = Number(item.id) || undefined;

    if (!departmentId) {
      addNotification({
        type: "error",
        iconType: "error",
        title: "Ошибка",
        message: "Не удалось найти ID подразделения",
      });
      return;
    }

    try {
      await deleteDepartment.mutateAsync(departmentId);
      setLocalDirections((items) => items.filter((i) => i.id !== item.id));
      addNotification({
        iconType: "success",
        title: "Удалено",
        message: `«${item.name}» удалено`,
      });
    } catch (error) {
      console.error("Error deleting direction:", error);
    }
  };

  const handleDeleteSis = async (item: OrgItemType) => {
    if (onDeleteSis) {
      onDeleteSis(item);
      return;
    }

    const departmentId = Number(item.id) || undefined;

    if (!departmentId) {
      addNotification({
        type: "error",
        iconType: "error",
        title: "Ошибка",
        message: "Не удалось найти ID подразделения",
      });
      return;
    }

    try {
      await deleteDepartment.mutateAsync(departmentId);
      setLocalSisList((items) => items.filter((i) => i.id !== item.id));
      addNotification({
        iconType: "success",
        title: "Удалено",
        message: `«${item.name}» удалено`,
      });
    } catch (error) {
      console.error("Error deleting sis:", error);
    }
  };

  const handleDirectionSave = (values: DirectionFormValues) => {
    if (!editingDirection) return;

    const updated: OrgItemType = {
      id: editingDirection.id,
      name: values.name,
      headName: values.headName,
    };

    const patch = (items: OrgItemType[]) =>
      items.map((i) => (i.id === updated.id ? updated : i));
    if (editingDirection.entityType === "direction") {
      setLocalDirections(patch);
    } else {
      setLocalSisList(patch);
    }

    setEditingDirection(null);
    addNotification({
      iconType: "success",
      title: "Сохранено",
      message: `«${values.name}» обновлено`,
    });
  };

  //TODO: отправлять display_order на сервер, чтобы перестановка (onReorder) сохранялась
  const handleSave = () => {
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const editingDepartments = useMemo(() => {
    if (!editingDirection) return [];
    
    return getDepartmentsForEntity(editingDirection.id);
  }, [editingDirection, getDepartmentsForEntity]);

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
        departments={editingDepartments}
        departmentId={editingDirection?.departmentId}
        onSave={handleDirectionSave}
      />
      
      <CreateDirectionModal
        key={creatingEntityType ?? "none-create"}
        open={creatingEntityType !== null}
        onOpenChange={(isOpen) => !isOpen && setCreatingEntityType(null)}
        entityType={creatingEntityType ?? "direction"}
        onCreate={handleCreate}
      />
    </>
  );
}