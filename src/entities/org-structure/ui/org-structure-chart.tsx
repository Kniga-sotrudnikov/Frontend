import { Skeleton } from "@/shared/ui/skeleton";
import { ZoomableImage } from "@/shared/ui/zoomable-image";
import { ZoomablePDF } from "@/shared/ui/zoomable-pdf";
import { useOrgStructureImage } from "@/entities/org-structure";
import { isPdf } from "@/entities/org-structure";

interface OrgStructureChartProps {
    zoom: number;
}

export const OrgStructureChart = ({ zoom }: OrgStructureChartProps) => {
    const { data, isPending, isError } = useOrgStructureImage();

    if (isPending) return <Skeleton className="w-full h-full" />;

    if (isError || !data)
      return (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          Не удалось загрузить схему
        </div>
      );

    if (data) 
      return (
        isPdf(data.image_url)
          ? <ZoomablePDF src={data.image_url} zoom={zoom} className="h-full" />
          : <ZoomableImage src={data.image_url} zoom={zoom} alt="Оргструктура"/>
      )
}