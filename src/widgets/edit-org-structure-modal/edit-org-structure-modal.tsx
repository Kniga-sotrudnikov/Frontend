import { useState, useMemo, useEffect } from "react";
import {
  useOrgStructureStore,
  OrgSection,
  type OrgItemType,
  type OrgUnit,
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
  const directions = useOrgStructureStore((state) => state.directions);
  const sisList = useOrgStructureStore((state) => state.sisList);
  const tree = useOrgStructureStore((state) => state.tree);
  const updateItem = useOrgStructureStore((state) => state.updateItem);
  const setDirections = useOrgStructureStore((state) => state.setDirections);
  const setSisList = useOrgStructureStore((state) => state.setSisList);

  const [open, setOpen] = useState(false);
  const [editingDirection, setEditingDirection] = useState<{
    id: string;
    name: string;
    headName: string;
    entityType: "direction" | "sis";
    departmentId?: number;
    headId?: number;
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
    return (entityType: "direction" | "sis", entityId?: string): Department[] => {
      if (!tree || tree.length === 0) return [];

      const parentNodeName = entityType === "direction" ? "Направления" : "СИС";
      const parentNode = tree.find(u => u.name === parentNodeName);
      
      if (!parentNode?.items) return [];

      const targetNode = parentNode.items.find(
        (item: OrgUnit) => String(item.id) === entityId
      );

      if (!targetNode?.items) return [];

      return targetNode.items.map((item: OrgUnit): Department => ({
        id: String(item.id || ''),
        name: item.name,
        headName: item.headName || '',
      }));
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
    let departmentId: number | undefined;
    let headId: number | undefined;
    
    const directionNode = tree.find(u => u.name === "Направления");
    if (directionNode?.items) {
      const found = directionNode.items.find((u: OrgUnit) => String(u.id) === item.id);
      if (found) {
        departmentId = found.id;
        headId = found.headId;
      }
    }

    setEditingDirection({ 
      ...item, 
      entityType: "direction",
      departmentId,
      headId,
    });
  };

  const handleEditSis = (item: OrgItemType) => {
    let departmentId: number | undefined;
    let headId: number | undefined;
    
    const sisNode = tree.find(u => u.name === "СИС");
    if (sisNode?.items) {
      const found = sisNode.items.find((u: OrgUnit) => String(u.id) === item.id);
      if (found) {
        departmentId = found.id;
        headId = found.headId;
      }
    }

    setEditingDirection({ 
      ...item, 
      entityType: "sis",
      departmentId,
      headId,
    });
  };

  const handleDeleteDirection = (item: OrgItemType) => {
    if (onDeleteDirection) {
      onDeleteDirection(item);
      return;
    }

    const directionNode = tree.find(u => u.name === "Направления");
    let departmentId: number | undefined;
    if (directionNode?.items) {
      const found = directionNode.items.find((u: OrgUnit) => String(u.id) === item.id);
      if (found?.id) departmentId = found.id;
    }

    if (!departmentId) {
      addNotification({
        type: "error",
        iconType: "error",
        title: "Ошибка",
        message: "Не удалось найти ID подразделения",
      });
      return;
    }

    deleteDepartment.mutate(departmentId);
    setLocalDirections((items) => items.filter((i) => i.id !== item.id));
    addNotification({
      iconType: "success",
      title: "Удалено",
      message: `«${item.name}» удалено`,
    });
  };

  const handleDeleteSis = (item: OrgItemType) => {
    if (onDeleteSis) {
      onDeleteSis(item);
      return;
    }

    const sisNode = tree.find(u => u.name === "СИС");
    let departmentId: number | undefined;
    if (sisNode?.items) {
      const found = sisNode.items.find((u: OrgUnit) => String(u.id) === item.id);
      if (found?.id) departmentId = found.id;
    }

    if (!departmentId) {
      addNotification({
        type: "error",
        iconType: "error",
        title: "Ошибка",
        message: "Не удалось найти ID подразделения",
      });
      return;
    }

    deleteDepartment.mutate(departmentId);
    setLocalSisList((items) => items.filter((i) => i.id !== item.id));
    addNotification({
      iconType: "success",
      title: "Удалено",
      message: `«${item.name}» удалено`,
    });
  };

  const handleDirectionSave = (values: DirectionFormValues) => {
    if (!editingDirection) return;

    const updated: OrgItemType = {
      id: editingDirection.id,
      name: values.name,
      headName: values.headName,
    };

    updateItem(editingDirection.entityType, updated);

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

  const handleSave = () => {
    setDirections(localDirections);
    setSisList(localSisList);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const editingDepartments = useMemo(() => {
    if (!editingDirection) return [];
    
    return getDepartmentsForEntity(
      editingDirection.entityType, 
      editingDirection.id
    );
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
        initialHeadId={editingDirection?.headId ?? null}
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