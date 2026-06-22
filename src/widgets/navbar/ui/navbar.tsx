import { useState } from "react";
import { useOrgStructureStore } from "@/entities/org-structure";
import RenderUnits from "./render-unit";
import { EditOrgStructureModal } from "@/widgets/edit-org-structure-modal";
import { Button } from "@/shared/ui/button";
import EditIcon from "@/shared/assets/icons/edit.svg?react";
import { useIsAdmin } from "@/entities/user";

function Navbar() {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const tree = useOrgStructureStore((state) => state.tree);
  const isAdmin = useIsAdmin();

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
      {tree.map((unit) => (
        <RenderUnits
          unit={unit}
          selectedName={selectedName}
          onSelect={setSelectedName}
          // TODO Если в структуре, которая придет с сервера будет id, то лучше key={unit.id}
          key={unit.name}
        />
      ))}
    </div>
  );
}

export { Navbar };
