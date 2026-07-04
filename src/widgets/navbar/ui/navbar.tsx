import { useOrgStructure, useSelectionUnitStore } from "@/entities/org-structure";
import RenderUnits from "./render-unit";
import { EditOrgStructureModal } from "@/widgets/edit-org-structure-modal";
import { Button } from "@/shared/ui/button";
import EditIcon from "@/shared/assets/icons/edit.svg?react";
import { useIsAdmin } from "@/entities/user";
import { handleSelect } from "../assets/handle-select";


function Navbar() {
  /* Сейчас хук useOrgStructure возвращает только структуру "Направления",
  возможно, когда на бэкенде добавят "СИС" и "УК" для них будут созданы 
  отдельные ендпоинты */
  const { data, isPending, isError } = useOrgStructure();
  const isAdmin = useIsAdmin();
  const selectedUnit = useSelectionUnitStore((state) => state.selectedUnit);
  const setSelectedUnit = useSelectionUnitStore((state) => state.setSelectedUnit);
  
  
  /* Дерево оргструктуры на бэкенде не содержит верхнеуровневые заголовки,
  при этом они должны быть встроены в дерево оргструктуры для рендера. 
  Пришлось добавить им отрицательные индексы, чтобы они не перекрывали индексы,
  приходящие с бэка */
  const treeForRender = [
    {
    id: -1,
    name: "УК",
    head: true,
    items: []
    },
    {
    id: -2,
    name: "Направления",
    head: true,
    items: data ?? []
    },
    {
    id: -3,
    name: "СИС",
    head: true,
    items: []
    },
  ];

  return (
    <div className="h-full w-full bg-white px-2.5 pt-2.5 pb-5 rounded-t-2xl border-t border-l border-r border-border">
      <div className="flex items-center justify-between">
        <h4 className="mx-2.5 mt-2.5 font-bold text-muted-foreground">
          Навигация
        </h4>
        {isAdmin && (
          <EditOrgStructureModal>
            <Button
              variant="ghost"
              size="plain"
              className="p-0 h-5 w-5 mr-2.5"
              aria-label="Редактировать оргструктуру"
            >
              <EditIcon className="h-5 w-5" />
            </Button>
          </EditOrgStructureModal>
        )}
      </div>
      
      {!isPending && !isError && treeForRender?.map((unit) => (
        <RenderUnits
          unit={unit}
          selectedId={selectedUnit?.id ?? null}
          onSelect={(unit) => handleSelect(unit, selectedUnit, setSelectedUnit)}
          key={unit.id}
        />
      ))}
    </div>
  );
}

export { Navbar };
