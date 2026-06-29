import { useNotificationStore } from "@/shared/model/stores";
import { Skeleton } from "@/shared/ui/skeleton";
import { ZoomableImage } from "@/shared/ui/zoomable-image";
import { ZoomablePDF } from "@/shared/ui/zoomable-pdf";
import { useOrgStructureImage } from "../api/use-org-structure-image";
import { isPdf } from "../lib/is-pdf";

interface OrgStructureChartProps {
    zoom: number;
}

export const OrgStructureChart = ({ zoom }: OrgStructureChartProps) => {
    const { data, isPending, isError } = useOrgStructureImage();
    const addNotification = useNotificationStore((state) => state.add);

    if (isPending) return <Skeleton className="w-full h-full" />;

    if (isError || !data) {
      addNotification({
        iconType: "error",
        type: "error",
        title: "Не удалось загрузить схему",
        message: "Попробуйте обновить страницу позже",
      });

      return (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          Не удалось загрузить схему
        </div>
      );
    }

    return (
      isPdf(data.image_url)
        ? <ZoomablePDF src={data.image_url} zoom={zoom} className="h-full" />
        : <ZoomableImage src={data.image_url} zoom={zoom} alt="Оргструктура"/>
    )
}