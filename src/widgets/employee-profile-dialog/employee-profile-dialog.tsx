import { useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import InfoIcon from "@/shared/assets/icons/warning.svg?react";
import LinkIcon from "@/shared/assets/icons/link.svg?react";
import ExportIcon from "@/shared/assets/icons/export.svg?react";
import MailIcon from "@/shared/assets/icons/mail.svg";
import LocationIcon from "@/shared/assets/icons/location.svg";
import DocumentIcon from "@/shared/assets/icons/document.svg";
import LeaderIcon from "@/shared/assets/icons/leader.svg";
import PhoneIcon from "@/shared/assets/icons/phone.svg";
import CalendarIcon from "@/shared/assets/icons/calendar.svg";
import TagIcon from "@/shared/assets/icons/tag.svg";
import { CollapsibleBadgeList } from "@/shared/ui/collapsible-badge-list";
import { InfoSection } from "@/shared/ui/info-section";
import { ReportInaccuracyModal } from "@/shared/ui/report-inaccuracy-modal/report-inaccuracy-modal";
import { Button } from "@/shared/ui/button";
import { useNotificationStore } from "@/shared/model/stores";
import { useExportPdf } from "@/shared/lib/hooks";
import { EmployeePdfContent } from "./employee-pdf-content";
import type { ReactElement, ReactNode } from "react";

interface EmployeeProfileDialogProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  editButton?: ReactNode;
  primaryInfo: ReactElement;
  emailInfo: ReactElement;
  phoneInfo: ReactElement;
  leader: ReactElement;
  roles: string[];
  city: string;
  birthday: string;
  linkSocialNetwork: string;
  linkCV: string;
  linkProfile: string;
  aboutMe: string;
  tags: string[];
  onExportPDF: () => void;
}

export const EmployeeProfileDialog = ({
  children,
  open,
  onOpenChange,
  editButton,
  primaryInfo,
  roles,
  emailInfo,
  phoneInfo,
  leader,
  city,
  birthday,
  linkSocialNetwork,
  linkCV,
  linkProfile,
  aboutMe,
  tags,
  onExportPDF,
}: EmployeeProfileDialogProps) => {
  const addNotification = useNotificationStore((state) => state.add);

  const { exportToPdf } = useExportPdf();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);

    addNotification({
      iconType: "success",
      title: "Ссылка на сотрудника скопирована",
      message: "Ссылка скопирована в буфер обмена",
    });

    addNotification({
      iconType: "success",
      title: "Ссылка на сотрудника скопирована",
      message: "Ссылка скопирована в буфер обмена",
    });
  };

  const formattedBirthday = new Date(birthday).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
  });

  const handleExportPDF = async () => {
    if (contentRef.current) {
      await exportToPdf(contentRef.current, "Карточка_сотрудника.pdf");
      onExportPDF();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-none w-[90vw] sm:max-w-[552px] rounded-md p-4 gap-4">
        <div className="fixed top-0 left-[-9999px] w-[552px] bg-white">
          <EmployeePdfContent
            ref={contentRef}
            primaryInfo={primaryInfo}
            roles={roles}
            emailInfo={emailInfo}
            phoneInfo={phoneInfo}
            leader={leader}
            city={city}
            birthday={birthday}
            linkSocialNetwork={linkSocialNetwork}
            linkCV={linkCV}
            linkProfile={linkProfile}
            aboutMe={aboutMe}
            tags={tags}
          />
        </div>

        <DialogHeader className="flex flex-row justify-between items-center p-0">
          <DialogTitle className="sr-only">Карточка сотрудника</DialogTitle>

          <div className="flex items-center gap-1">
            <ReportInaccuracyModal>
              <button
                type="button"
                className="h-4 w-4 cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="Информация"
              >
                <InfoIcon className="h-4 w-4 text-gray-900" />
              </button>
            </ReportInaccuracyModal>
          </div>

          <div className="flex items-center">
            <button
              type="button"
              onClick={handleCopyLink}
              className="h-5 w-5 cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Скопировать ссылку"
            >
              <LinkIcon className="h-4 w-4 text-gray-900" />
            </button>
            <DialogClose variant="icon" />
          </div>
        </DialogHeader>

        <div className="mt-0">{primaryInfo}</div>

        <div className="px-3 bg-gray-50 rounded-lg mb-0">
          <h3 className="text-[12px] font-semibold text-black mb-0">Роль</h3>
          <ul className="list-disc pl-4 space-y-0 mt-1">
            {roles.map((item, idx) => (
              <li key={idx} className="text-[12px] text-black leading-tight">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <InfoSection icon={TagIcon} title="Компетенции">
          <CollapsibleBadgeList
            visibleCount={3}
            items={tags}
            badgeClassName="bg-purple-50 text-purple-500 border-purple-500"
          />
        </InfoSection>

        <div className="grid grid-cols-2 gap-x-26 gap-y-3">
          <InfoSection icon={MailIcon} title="Электронная почта">
            {emailInfo}
          </InfoSection>

          <InfoSection icon={PhoneIcon} title="Телефон">
            {phoneInfo}
          </InfoSection>

          <InfoSection icon={LocationIcon} title="Город">
            <p className="text-[12px] text-black">{city}</p>
          </InfoSection>

          <InfoSection icon={CalendarIcon} title="День рождения">
            <p className="text-[12px] text-black">{formattedBirthday}</p>
          </InfoSection>

          <InfoSection icon={DocumentIcon} title="Документы">
            <div className="flex flex-col gap-1">
              <a
                href={linkCV}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-[12px] text-link hover:underline"
              >
                Резюме
              </a>
              <a
                href={linkProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-[12px] text-link hover:underline"
              >
                Профиль в CRM
              </a>
            </div>
          </InfoSection>

          <InfoSection icon={DocumentIcon} title="Социальная сеть">
            <a
              href={linkSocialNetwork}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-link hover:underline"
            >
              Ссылка
            </a>
          </InfoSection>

          <InfoSection icon={LeaderIcon} title="Руководитель">
            {leader}
          </InfoSection>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg my-0">
          <h3 className="text-[12px] body-overline-semibold text-black">
            Обо мне
          </h3>
          <p className="text-[12px] text-black leading-relaxed">{aboutMe}</p>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            className="px-3 py-2 justify-start w-fit text-xs text-gray-900 hover:bg-gray-50"
            onClick={handleExportPDF}
          >
            <ExportIcon className="h-3 w-3" />
            Экспортировать в PDF
          </Button>

          {editButton}
        </div>
      </DialogContent>
    </Dialog>
  );
};
