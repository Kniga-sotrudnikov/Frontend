import { useState } from "react";
import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { ZoomControl } from "@/shared/ui/zoom-control";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { useIsAdmin } from "@/entities/user";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { ClarifyingModal } from "@/features/upload-org-structure";
import { OrgStructureChart } from "@/entities/org-structure";

const OrgStructurePage = () => {
  const [zoom, setZoom] = useState(100);
  const [isClarifyingOpen, setIsClarifyingOpen] = useState(false);
  const isAdmin = useIsAdmin();
  const isZoomabled = zoom > 100;

  return (
    <div>
      <PageHeader
        title="Оргструктура"
        stats={<span>144 сотрудников, 4 направления, 7 СИС</span>}
        birthday={<BirthdaysPopover />}
        user={<HeaderUserCard />}
      />
      <main className="h-screen pt-5 pb-10 px-10 flex flex-col gap-5 max-[1100px]:px-5">
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
