import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import defaultPhoto from "@/shared/assets/images/avatar-placeholder.jpg";
import WorkingIcon from "@/shared/assets/icons/working.svg";
import BizTripIcon from "@/shared/assets/icons/biz-trip.svg";
import VacationIcon from "@/shared/assets/icons/vacation.svg";
import SickIcon from "@/shared/assets/icons/sick.svg";
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
import { cn } from "@/shared/lib";
import { CollapsibleList } from "./collapsible-list";
import { InfoSection } from "./info-section";
import { ReportInaccuracyModal } from "./report-inaccuracy-modal";
import { Button } from "@/shared/ui/button";

type EmployeeStatus = "working" | "bizTrip" | "vacation" | "sick";

interface EmployeeCardBigProps {
  children: React.ReactNode;
  photo?: string;
  isArchived?: boolean;
  name: string;
  position: string;
  franchise: string;
  department: string;
  status: EmployeeStatus;
  roles: string[];
  corporateEmail: string;
  personalEmail: string;
  corporatePhone: string;
  personalPhone: string;
  city: string;
  birthday: string;
  linkSocialNetwork: string;
  linkCV: string;
  linkProfile: string;
  aboutMe: string;
  tags: string[];
  onExportPDF: () => void;
}

const statusIconMap: Record<EmployeeStatus, string> = {
  working: WorkingIcon,
  bizTrip: BizTripIcon,
  vacation: VacationIcon,
  sick: SickIcon,
};

const statusLabelMap: Record<EmployeeStatus, string> = {
  working: "Работает",
  bizTrip: "В командировке",
  vacation: "В отпуске",
  sick: "На больничном",
};

export const EmployeeCardBig = ({
  children,
  photo = defaultPhoto,
  isArchived = false,
  name,
  position,
  franchise,
  department,
  status,
  roles,
  corporateEmail,
  personalEmail,
  corporatePhone,
  personalPhone,
  city,
  birthday,
  linkSocialNetwork,
  linkCV,
  linkProfile,
  aboutMe,
  tags,
  onExportPDF,
}: EmployeeCardBigProps) => {
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
        <div className="flex gap-4">
          <div className="relative shrink-0 w-26.5 h-23.5 bg-gray-100 rounded-8 overflow-hidden">
            <img
              src={photo}
              alt="Фото сотрудника"
              className={cn(
                "size-full object-cover",
                isArchived && "grayscale",
              )}
            />

            {!isArchived && (
              <div className="absolute bottom-0 right-0">
                <img
                  src={statusIconMap[status]}
                  alt={statusLabelMap[status]}
                  className="size-6"
                  title={statusLabelMap[status]}
                />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="body-s-semibold text-black max-w-72.5 mb-2 truncate">
              {name}
            </h3>
            <p className="body-s mb-3 max-w-72.5 truncate text-gray-600">
              {position}
            </p>
            <p className="body-overline mb-2 max-w-72.5 truncate text-gray-600">
              {franchise}
            </p>
            <p className="body-overline max-w-72.5 truncate text-gray-600">
              {department}
            </p>
          </div>
        </div>
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
          <CollapsibleList items={tags} />
        </InfoSection>
        <div className="w-full grid grid-cols-[max-content_max-content] justify-between gap-y-2">
          <InfoSection icon={MailIcon} title="Электронная почта">
            <div className="flex flex-col gap-1">
              <div className="inline-flex gap-1 items-center">
                <a
                  href={`mailto:${corporateEmail}`}
                  className="text-link hover:underline text-xs"
                >
                  {corporateEmail}
                </a>
                <span className="text-xs whitespace-nowrap">(корп.)</span>
              </div>

              <div className="inline-flex gap-1 items-center">
                <a
                  href={`mailto:${personalEmail}`}
                  className="text-link hover:underline text-xs"
                >
                  {personalEmail}
                </a>
                <span className="text-xs whitespace-nowrap">(личн.)</span>
              </div>
            </div>
          </InfoSection>

          <InfoSection icon={PhoneIcon} title="Телефон">
            <div className="flex flex-col gap-1">
              <div className="inline-flex gap-1 items-center">
                <a
                  href={`tel:${corporatePhone}`}
                  className="text-link hover:underline text-xs"
                >
                  {corporatePhone}
                </a>
                <span className="text-xs whitespace-nowrap">(корп.)</span>
              </div>

              <div className="inline-flex gap-1 items-center">
                <a
                  href={`tel:${personalPhone}`}
                  className="text-link hover:underline text-xs"
                >
                  {personalPhone}
                </a>
                <span className="text-xs whitespace-nowrap">(личн.)</span>
              </div>
            </div>
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
            <div className="flex gap-1 items-center">
              <img
                src={photo}
                alt="Фото сотрудника"
                className={"object-cover rounded-full size-9"}
              />
              <div className="flex flex-col gap-1">
                <p className="text-xs">{name}</p>
                <p className="text-xs text-gray-700">{position}</p>
              </div>
            </div>
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
