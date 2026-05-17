import { useState } from "react"
import { SearchInput } from "@/shared/ui/input"
import { PageHeader } from "@/widgets/page-header"
import { HeaderUserCard } from "@/widgets/header-user-card"
import { ZoomControl } from "@/shared/ui/zoom-control"
import { Button } from "@/shared/ui/button"
import { Separator } from "@/shared/ui/separator"
// import { ZoomableImage } from "@/shared/ui/zoomable-image"
import { ZoomablePDF } from "@/shared/ui/zoomable-pdf"
import { mockCurrentUser } from "@/entities/user"
// import Chart from "@/shared/assets/images/Chart.png"
import ChartPdf from "@/shared/assets/images/Chart.pdf"
import { BirthdaysPopover } from "@/widgets/birthdays-popover"

const OrgStructurePage = () => {
  const [zoom, setZoom] = useState(100)
  const isAdmin = mockCurrentUser.role === "hr_admin"

  return (
    <div className="bg-gray-50">
      <PageHeader
        title="Оргструктура"
        stats={<span>144 сотрудников, 4 направления, 7 СИС</span>}
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        birthday={<BirthdaysPopover />}
        user={<HeaderUserCard name="Алексеева Виктория" position="HR-специалист" />}
      />
      <main className="h-screen mt-5 mx-10 flex flex-col gap-5">
        <div className="flex justify-start gap-7">
          {isAdmin && <Button variant="outline">Загрузить схему</Button>}
          <Button variant="outline" className="px-3.5">Экспортировать</Button>
          <Separator orientation="vertical" />
          <ZoomControl value={zoom} onChange={setZoom} />
        </div>
        {/* <div className="border rounded-2xl border-border overflow-hidden">
          <ZoomableImage src={Chart} alt="Оргструктура" zoom={zoom} />
        </div> */}
        <ZoomablePDF src={ChartPdf} zoom={zoom} className="flex-1 min-h-0" />
      </main>
    </div>
  )
}

export const Component = OrgStructurePage
