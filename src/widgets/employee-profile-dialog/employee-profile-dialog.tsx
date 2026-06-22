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
import type { ReactElement, ReactNode } from "react";

interface EmployeeProfileDialogProps {
  children: ReactNode;
  /**
   * Блок основной информации сотрудника.
   * Используется EmployeePrimaryInfo.
   */
  primaryInfo: ReactElement;
  /**
   * Блок контактов сотрудника.
   * Используется EmployeeContacts.
   */
  emailInfo: ReactElement;
  /**
   * Блок контактов сотрудника.
   * Используется EmployeeContacts.
   */
  phoneInfo: ReactElement;
  /**
   * Блок информации о руководителе.
   * Используется LeaderPrimaryInfo.
   */
  leader: ReactElement;
  roles: string[];
  city: string;
  birthday: string | Date;
  linkSocialNetwork: string;
  linkCV: string;
  linkProfile: string;
  aboutMe: string;
  tags: string[];
  onExportPDF: () => void;
}

//TODO: Отредактировать вёрстку компонента. Убрать поля или блоки если в переменных нет данных
export const EmployeeProfileDialog = ({
  children,
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
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Dialog>
      <DialogTrigger asChild children={children} />
      <DialogContent className="max-w-none w-[90vw] sm:max-w-[552px] rounded-md">
        <DialogHeader className="justify-between">
          <DialogTitle className="body-l-semibold text-black sr-only">
            Карточка сотрудника
          </DialogTitle>
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
        </DialogHeader>
        {primaryInfo}
        <div className="p-3 bg-gray-50 rounded-8">
          <h3 className="mb-1 body-overline-semibold text-black">Роль</h3>
          <ul className="list-disc pl-4 space-y-0 ">
            {roles.map((item, idx) => (
              <li key={idx} className="body-overline text-black leading-tight">
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
        <div className="w-full grid grid-cols-[max-content_max-content] justify-between gap-y-2">
          <InfoSection icon={MailIcon} title="Электронная почта">
            {emailInfo}
          </InfoSection>

          <InfoSection icon={PhoneIcon} title="Телефон">
            {phoneInfo}
          </InfoSection>

          <InfoSection icon={LocationIcon} title="Город">
            <p className="text-xs">{city}</p>
          </InfoSection>

          <InfoSection icon={CalendarIcon} title="День рождения">
            <p className="text-xs">
              {new Date(birthday).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
              })}
            </p>
          </InfoSection>

          <InfoSection icon={DocumentIcon} title="Документы">
            <div className="flex flex-col gap-1">
              <a
                href={linkCV}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-xs text-link hover:underline"
              >
                Резюме
              </a>

              <a
                href={linkProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-xs text-link hover:underline"
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
              className="text-xs text-link hover:underline"
            >
              Ссылка
            </a>
          </InfoSection>

          <InfoSection icon={LeaderIcon} title="Руководитель">
            {leader}
          </InfoSection>
        </div>

        <div className="p-3 bg-gray-50 rounded-8">
          <h3 className="mb-1 body-overline-semibold text-black">Обо мне</h3>
          <p className="text-xs">{aboutMe}</p>
        </div>
        <Button
          variant="ghost"
          className="px-4 py-2 justify-start w-fit"
          onClick={onExportPDF}
        >
          <ExportIcon className="h-4 w-4" />
          Экспортировать в PDF
        </Button>
      </DialogContent>
    </Dialog>
  );
};
