import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@ui/dialog";
import { Button } from "@ui/button";
import { Badge } from "@/shared/ui/badge";
import { ReportInaccuracyModal } from "@/shared/ui/report-inaccuracy-modal";
import { useNotificationStore } from "@/shared/model/stores";
import InfoIcon from "@/shared/assets/icons/warning.svg?react";
import LinkIcon from "@/shared/assets/icons/link.svg?react";
import ExportIcon from "@/shared/assets/icons/export.svg?react";
import TagIcon from "@/shared/assets/icons/tag.svg?react";

interface Vacancy {
  id: number | string;
  title: string;
  location: string;
  employmentDetails: string[];
  franchise: string;
  department: string;
  description: string;
  responsibilities: string[];
  competencies: string[];
}

interface VacancyCardProps {
  children?: React.ReactNode;
  vacancy: Vacancy;
  onExportPDF?: () => void;
  onRespond?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function VacancyCard({
  children,
  vacancy,
  onExportPDF,
  open,
  onOpenChange,
}: VacancyCardProps) {
  const {
    title,
    location,
    employmentDetails,
    franchise,
    department,
    description,
    responsibilities,
    competencies,
  } = vacancy;

  const addNotification = useNotificationStore((state) => state.add);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    addNotification({
      iconType: "success",
      title: "Ссылка на вакансию скопирована",
      message: "Ссылка скопирована в буфер обмена",
    });
  };

  const handleRespond = () => {
    addNotification({
      iconType: "success",
      title: "В разработке",
      message: "Функция отклика на вакансию находится в разработке",
    });
  };

  const hasTitle = !!title;
  const hasLocation = !!location;
  const hasEmploymentDetails = employmentDetails?.length > 0;
  const hasFranchise = !!franchise;
  const hasDepartment = !!department;
  const hasDescription = !!description;
  const hasResponsibilities = responsibilities?.length > 0;
  const hasCompetencies = competencies?.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-none w-[90vw] sm:max-w-138 rounded-8">
        <div className="flex items-center justify-between mx-3">
          <ReportInaccuracyModal>
            <button
              type="button"
              className="h-5 w-5 cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Информация"
            >
              <InfoIcon className="h-5 w-5" />
            </button>
          </ReportInaccuracyModal>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="h-5 w-5 cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Скопировать ссылку"
            >
              <LinkIcon className="h-5 w-5" />
            </button>
            <DialogClose variant="icon" />
          </div>
        </div>

        <div className="px-3">
          {(hasTitle || hasLocation || hasEmploymentDetails) && (
            <div className="flex flex-col gap-2">
              {hasTitle && <h2 className="body-s-semibold">{title}</h2>}
              {hasLocation && (
                <p className="body-s text-gray-600">{location}</p>
              )}

              {hasEmploymentDetails && (
                //TODO: Заменить на CollapsibleBadgeList
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {employmentDetails.map((tag, idx) => (
                    <Badge
                      key={idx}
                      className="bg-gray-200 text-black border-black"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {(hasFranchise || hasDepartment) && (
            <div className="flex flex-col gap-2 body-overline text-gray-600">
              {hasFranchise && <span>{franchise}</span>}
              {hasDepartment && <span>{department}</span>}
            </div>
          )}
        </div>

        {hasDescription && (
          <div className="px-3 py-3 border-t border-b">
            <h3 className="mb-3.5 body-overline-semibold text-black">
              Описание вакансии
            </h3>
            <p className="body-overline text-black">{description}</p>
          </div>
        )}

        {hasResponsibilities && (
          <div className="px-3 pt-3.5 pb-2 bg-gray-50 rounded-8">
            <h3 className="mb-1 body-overline-semibold text-black">
              Обязанности
            </h3>
            <ul className="list-none space-y-0">
              {responsibilities.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-1.5 ml-2 leading-tight"
                >
                  <span className="text-black">•</span>
                  <span className="body-overline text-black">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasCompetencies && (
          //TODO: Заменить данный компонент div на InfoSection, список бейджей заменить на CollapsibleBadgeList
          <div className="px-3">
            <div className="flex items-center gap-1 mb-5">
              <TagIcon className="h-4 w-4 text-gray-600" />
              <h3 className="body-overline-semibold">Компетенции</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {competencies.map((item, idx) => (
                <Badge
                  key={idx}
                  className="bg-purple-50 text-purple-500 border-purple-500"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center px-3">
          <Button variant="ghost" className="p-0 gap-2" onClick={onExportPDF}>
            <ExportIcon className="h-4 w-4" />
            Экспортировать в PDF
          </Button>
          <Button
            variant="outline"
            className="h-8 px-4 bg-purple-500 border-purple-500 text-white hover:bg-purple-400 hover:text-white"
            onClick={handleRespond}
          >
            Откликнуться
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { VacancyCard };
