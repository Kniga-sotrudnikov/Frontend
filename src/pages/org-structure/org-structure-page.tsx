import { useState, useEffect } from "react";
import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { ZoomControl } from "@/shared/ui/zoom-control";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { useIsAdmin } from "@/entities/user";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { ClarifyingModal } from "@/features/upload-org-structure";
import {
  OrgStructureChart,
  useOrgStructure,
  useOrgStructureStore,
  type OrgUnit,
} from "@/entities/org-structure";

const OrgStructurePage = () => {
  const [zoom, setZoom] = useState(100);
  const [isClarifyingOpen, setIsClarifyingOpen] = useState(false);
  const isAdmin = useIsAdmin();
  const isZoomabled = zoom > 100;

  const { data: treeData, isLoading } = useOrgStructure();
  const setTree = useOrgStructureStore((state) => state.setTree);

  useEffect(() => {
    if (treeData) {
      setTree(treeData);
    }
  }, [treeData, setTree]);

  const countEmployees = (units: OrgUnit[]): number => {
    return units.reduce((sum, unit) => {
      return sum + (unit.employeeCount || 0) + countEmployees(unit.items || []);
    }, 0);
  };

  const totalEmployees = treeData ? countEmployees(treeData) : 0;

  const directionsNode = treeData?.find((u) => u.name === "Направления");
  const sisNode = treeData?.find((u) => u.name === "СИС");

  const directionsCount = directionsNode?.items?.length || 0;
  const sisCount = sisNode?.items?.length || 0;

  return (
    <div>
      <PageHeader
        title="Оргструктура"
        stats={
          isLoading
            ? "Загрузка..."
            : `${totalEmployees} сотрудников, ${directionsCount} направлений, ${sisCount} СИС`
        }
        birthday={<BirthdaysPopover />}
        user={<HeaderUserCard />}
      />
      <main className="h-screen pt-5 pb-10 px-10 flex flex-col gap-5">
        <div className="flex justify-start gap-7">
          {isAdmin && (
            <Button variant="outline" onClick={() => setIsClarifyingOpen(true)}>
              Загрузить схему
            </Button>
          )}
          <Button variant="outline" className="px-3.5">
            Экспортировать
          </Button>
          <Separator orientation="vertical" />
          <ZoomControl value={zoom} onChange={setZoom} />
          {isZoomabled && (
            <Button variant="outline" onClick={() => setZoom(100)}>
              Сбросить масштабирование
            </Button>
          )}
        </div>
        <div className="border rounded-2xl border-border overflow-hidden flex-1 min-h-0">
          <OrgStructureChart zoom={zoom} />
        </div>
      </main>
      <ClarifyingModal
        open={isClarifyingOpen}
        onOpenChange={setIsClarifyingOpen}
      />
    </div>
  );
};

export const Component = OrgStructurePage;
