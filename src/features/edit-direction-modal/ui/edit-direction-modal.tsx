import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@ui/dialog";
import { Button } from "@/shared/ui/button";
import { useNotificationStore } from "@/shared/model/stores";
import { usePreventDialogCloseOnPassthrough } from "@/shared/lib/hooks/use-prevent-dialog-close-on-passthrough";
import { EmployeeSelectField, EmployeesMultiSelect, useBulkEmployeeAction, getEmployeesListPublic } from "@/entities/employee";
import {
  OrgSection,
  DirectionFormFields,
  DepartmentForm,
  useUpdateDepartment,
  useCreateDepartment,
  type DepartmentFormData,
} from "@/entities/org-structure";
import type { EditDirectionModalProps, Department } from "../model/types";

export function EditDirectionModal({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  entityType,
  initialName = "",
  initialHeadName = "",
  initialHeadId = null,
  initialDescription = "",
  departments: initialDepartments = [],
  onAddDepartment,
  onEditDepartment,
  onDeleteDepartment,
  onSave,
  departmentId,
}: EditDirectionModalProps & { departmentId?: number }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled
    ? (val: boolean) => controlledOnOpenChange?.(val)
    : setInternalOpen;

  const [name, setName] = useState(initialName);
  const [headName, setHeadName] = useState(initialHeadName);
  const [headId, setHeadId] = useState<number | null>(initialHeadId);
  const [description, setDescription] = useState(initialDescription);
  const [departments, setDepartments] =
    useState<Department[]>(initialDepartments);
  const [isDepartmentFormOpen, setIsDepartmentFormOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null,
  );
  const [editingDraft, setEditingDraft] = useState<Omit<
    DepartmentFormData,
    "id"
  > | null>(null);
  const [editingInitialEmployeeIds, setEditingInitialEmployeeIds] = useState<
    number[]
  >([]);

  const updateDepartment = useUpdateDepartment();
  const createDepartment = useCreateDepartment();
  const bulkEmployeeAction = useBulkEmployeeAction();
  const addNotification = useNotificationStore((state) => state.add);
  const preventPassthroughClose = usePreventDialogCloseOnPassthrough();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setName(initialName);
      setHeadName(initialHeadName);
      setHeadId(initialHeadId);
      setDescription(initialDescription);
      setDepartments(initialDepartments);
      setIsDepartmentFormOpen(false);
      setEditingDepartment(null);
      setEditingDraft(null);
      setEditingInitialEmployeeIds([]);
    }
    setOpen(isOpen);
  };

  const handleSave = () => {
    if (!departmentId) {
      addNotification({
        type: "error",
        iconType: "error",
        title: "Ошибка",
        message: "ID подразделения не указан",
      });
      return;
    }

    if (!name.trim()) {
      addNotification({
        type: "error",
        iconType: "error",
        title: "Ошибка",
        message: "Название обязательно для заполнения",
      });
      return;
    }

    updateDepartment.mutate(
      {
        id: departmentId,
        data: {
          name: name.trim(),
          description: description.trim() || undefined,
          head_id: headId,
        },
      },
      {
        onSuccess: () => {
          handleOpenChange(false);
          onSave?.({ name, headName, description }, departments);
        },
      },
    );
  };

  const handleAddDepartment = () => {
    if (onAddDepartment) {
      onAddDepartment();
    } else {
      setEditingDepartment(null);
      setEditingDraft(null);
      setEditingInitialEmployeeIds([]);
      setIsDepartmentFormOpen(true);
    }
  };

  const handleDepartmentFormSave = (values: Omit<DepartmentFormData, "id">) => {
    if (!departmentId) {
      addNotification({
        type: "error",
        iconType: "error",
        title: "Ошибка",
        message: "ID подразделения не указан",
      });
      return;
    }

    createDepartment.mutate(
      {
        name: values.name,
        type: "department",
        parent: departmentId,
        head_id: values.headId,
      },
      {
        onSuccess: (response) => {
          const createdId = response?.data?.id;

          if (createdId && values.employeeIds.length > 0) {
            bulkEmployeeAction.mutate(
              {
                employee_ids: values.employeeIds,
                action: "change_department",
                params: { department_id: createdId },
              },
              {
                onSuccess: (result) => {
                  if (result.failed > 0) {
                    addNotification({
                      type: "error",
                      iconType: "error",
                      title: "Частичная ошибка",
                      message: `Не удалось добавить ${result.failed} из ${result.total} сотрудников в отдел «${values.name}»`,
                    });
                  }
                },
              },
            );
          }

          setDepartments((prev) => [
            ...prev,
            {
              id: String(createdId ?? crypto.randomUUID()),
              name: values.name,
              headName: values.headName,
            },
          ]);
          setIsDepartmentFormOpen(false);
        },
      },
    );
  };

  const handleEditDepartment = (dept: Department) => {
    if (onEditDepartment) {
      onEditDepartment(dept);
      return;
    }

    setIsDepartmentFormOpen(false);

    getEmployeesListPublic({ department_id: Number(dept.id), limit: 1000 })
      .then((response) => {
        const employeeIds = response.results.map((employee) => employee.id);
        setEditingInitialEmployeeIds(employeeIds);
        setEditingDepartment(dept);
        setEditingDraft({
          name: dept.name,
          headId: dept.headId ?? null,
          headName: dept.headName,
          employeeIds,
        });
      })
      .catch(() => {
        addNotification({
          type: "error",
          iconType: "error",
          title: "Ошибка",
          message: "Не удалось загрузить сотрудников отдела",
        });
      });
  };

  const handleEditDepartmentSave = (
    values: Omit<DepartmentFormData, "id">,
  ) => {
    if (!editingDepartment) return;

    const editingDepartmentId = Number(editingDepartment.id);

    updateDepartment.mutate(
      {
        id: editingDepartmentId,
        data: {
          name: values.name,
          head_id: values.headId,
        },
      },
      {
        onSuccess: () => {
          const addedEmployeeIds = values.employeeIds.filter(
            (id) => !editingInitialEmployeeIds.includes(id),
          );

          if (addedEmployeeIds.length > 0) {
            bulkEmployeeAction.mutate(
              {
                employee_ids: addedEmployeeIds,
                action: "change_department",
                params: { department_id: editingDepartmentId },
              },
              {
                onSuccess: (result) => {
                  if (result.failed > 0) {
                    addNotification({
                      type: "error",
                      iconType: "error",
                      title: "Частичная ошибка",
                      message: `Не удалось добавить ${result.failed} из ${result.total} сотрудников в отдел «${values.name}»`,
                    });
                  }
                },
              },
            );
          }

          setDepartments((prev) =>
            prev.map((department) =>
              department.id === editingDepartment.id
                ? {
                    ...department,
                    name: values.name,
                    headName: values.headName,
                    headId: values.headId,
                  }
                : department,
            ),
          );
          setEditingDepartment(null);
          setEditingDraft(null);
          setEditingInitialEmployeeIds([]);
        },
      },
    );
  };

  const handleEditDepartmentCancel = () => {
    setEditingDepartment(null);
    setEditingDraft(null);
    setEditingInitialEmployeeIds([]);
  };

  const handleDeleteDepartment = (dept: Department) => {
    if (onDeleteDepartment) {
      onDeleteDepartment(dept);
    } else {
      addNotification({
        iconType: "success",
        title: "В разработке",
        message: "Функция будет доступна в ближайшее время",
      });
    }
  };

  const isNameValid = name.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent
        className="max-w-188! rounded-8 gap-6 px-7 py-8 flex flex-col h-auto"
        onInteractOutside={preventPassthroughClose}
      >
        <div className="flex items-center justify-between shrink-0">
          <h2 className="body-m-semibold text-black">
            {entityType === "direction"
              ? "Редактировать направление"
              : "Редактировать СИС"}
          </h2>
          <DialogClose variant="icon" />
        </div>

        <div className="flex flex-col flex-1 gap-6 overflow-y-auto">
          <DirectionFormFields
            nameLabel={
              entityType === "direction"
                ? "Название направления"
                : "Название службы"
            }
            name={name}
            onNameChange={setName}
            headLabel={
              entityType === "direction"
                ? "Руководитель направления"
                : "Руководитель службы"
            }
            headSlot={
              <EmployeeSelectField
                value={headId}
                initialName={initialHeadName}
                onChange={(id, selectedName) => {
                  setHeadId(id);
                  setHeadName(selectedName);
                }}
                placeholder="Выберите руководителя"
              />
            }
            description={description}
            onDescriptionChange={setDescription}
          />

          <OrgSection
            title="Отделы"
            addButtonText="Добавить отдел"
            items={departments}
            onAdd={handleAddDepartment}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
            onReorder={setDepartments}
          >
            {isDepartmentFormOpen && (
              <DepartmentForm
                onSave={handleDepartmentFormSave}
                onCancel={() => setIsDepartmentFormOpen(false)}
                headSlot={({ value, onChange }) => (
                  <EmployeeSelectField
                    value={value}
                    onChange={onChange}
                    placeholder="Выберите руководителя"
                  />
                )}
                employeesSlot={({ value, onChange }) => (
                  <EmployeesMultiSelect
                    value={value}
                    onChange={onChange}
                    placeholder="Выберите сотрудников"
                  />
                )}
              />
            )}
            {editingDepartment && editingDraft && (
              <DepartmentForm
                initialValues={editingDraft}
                isEditing
                onSave={handleEditDepartmentSave}
                onCancel={handleEditDepartmentCancel}
                headSlot={({ value, onChange }) => (
                  <EmployeeSelectField
                    value={value}
                    initialName={editingDraft.headName}
                    onChange={onChange}
                    placeholder="Выберите руководителя"
                  />
                )}
                employeesSlot={({ value, onChange }) => (
                  <EmployeesMultiSelect
                    value={value}
                    onChange={onChange}
                    placeholder="Выберите сотрудников"
                  />
                )}
              />
            )}
          </OrgSection>
        </div>

        <div className="flex justify-end gap-3.75 shrink-0">
          <DialogClose variant="custom" asChild>
            <Button
              variant="ghost"
              size="plain"
              className="button-small px-4 h-8"
              disabled={updateDepartment.isPending}
            >
              Отмена
            </Button>
          </DialogClose>
          <Button
            variant="default"
            size="plain"
            className="button-small px-4 h-8"
            onClick={handleSave}
            disabled={!isNameValid || updateDepartment.isPending}
          >
            {updateDepartment.isPending
              ? "Сохранение..."
              : "Сохранить изменения"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
