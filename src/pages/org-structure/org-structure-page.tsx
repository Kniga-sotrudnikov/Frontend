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
    <div className="flex h-full min-h-0 flex-col">
      <PageHeader
        title="Оргструктура"
        stats={<span>144 сотрудников, 4 направления, 7 СИС</span>}
        birthday={<BirthdaysPopover />}
        user={<HeaderUserCard />}
      />
      <main className="flex min-h-0 flex-1 flex-col gap-5 px-10 pt-5 pb-10 max-[1100px]:px-5">
        <div className="flex shrink-0 justify-start gap-7">
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
        <div className="min-h-0 flex-1 overflow-hidden">
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
