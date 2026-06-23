import { useState } from "react";
import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { ZoomControl } from "@/shared/ui/zoom-control";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { ZoomableImage } from "@/shared/ui/zoomable-image";
import { ZoomablePDF } from "@/shared/ui/zoomable-pdf";
import { useIsAdmin } from "@/entities/user";
import Chart from "@/shared/assets/images/Chart.png";
import ChartPdf from "@/shared/assets/images/Chart.pdf";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { ClarifyingModal } from "@/features/upload-org-structure";

const OrgStructurePage = () => {
  const [zoom, setZoom] = useState(100);
  const [isClarifyingOpen, setIsClarifyingOpen] = useState(false);
  const isAdmin = useIsAdmin();
  // TODO: значение isImage будут определятся форматом файла загружаемого с сервера
  const isImage = true;
  const isZoomabled = zoom > 100;

  return (
    <div>
      <PageHeader
        title="Оргструктура"
        stats={<span>144 сотрудников, 4 направления, 7 СИС</span>}
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        birthday={<BirthdaysPopover />}
        user={
          <HeaderUserCard name="Алексеева Виктория" position="HR-специалист" />
        }
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
          {isImage ? (
            <ZoomableImage src={Chart} alt="Оргструктура" zoom={zoom} />
          ) : (
            <ZoomablePDF src={ChartPdf} zoom={zoom} className="h-full" />
          )}
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
