import { useRef, useMemo } from "react";
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
import { useTags } from "@/entities/tags";
import { EmployeePdfContent } from "./employee-pdf-content";
import type { ReactNode } from "react";
import { useEmployeeDetail } from "@/entities/employee";
import { useIsAdmin } from "@/entities/user";
import { Skeleton } from "@ui/skeleton";
import { EmployeePrimaryInfo } from "@/entities/employee/ui/employee-primary-info";
import { EmployeeContacts } from "@/entities/employee/ui/employee-contacts";
import { LeaderPrimaryInfo } from "@/entities/employee/ui/leader-primary-info";

interface EmployeeProfileDialogProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  employeeId: number | null;
  editButton?: ReactNode;
}

export const EmployeeProfileDialog = ({
  children,
  open,
  onOpenChange,
  employeeId,
  editButton,
}: EmployeeProfileDialogProps) => {
  const addNotification = useNotificationStore((state) => state.add);
  const { exportToPdf } = useExportPdf();
  const contentRef = useRef<HTMLDivElement>(null);
  const isAdmin = useIsAdmin();

  const { data: employee, isLoading } = useEmployeeDetail(
    employeeId || undefined,
    isAdmin ? "hr_admin" : "employee"
  );

  const { data: tagsData } = useTags({ limit: 100 });
  
  const tagNameMap = useMemo(() => {
    const map = new Map<string, string>();
    if (tagsData?.results) {
      tagsData.results.forEach((tag) => {
        map.set(String(tag.id), tag.name);
      });
    }
    return map;
  }, [tagsData]);

  const tagNames = useMemo(() => {
    if (!employee?.competencies || !employee.competencies.length) return [];
    
    return employee.competencies.map((id) => {
      const idStr = String(id);
      return tagNameMap.get(idStr) || idStr;
    });
  }, [employee, tagNameMap]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    addNotification({
      iconType: "success",
      title: "Ссылка на сотрудника скопирована",
      message: "Ссылка скопирована в буфер обмена",
    });
  };

  const handleExportPDF = async () => {
    if (contentRef.current) {
      await exportToPdf(contentRef.current, "Карточка_сотрудника.pdf");
    }
  };

  if (!employeeId) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-w-none w-[90vw] sm:max-w-[552px] rounded-md p-4 gap-4">
        <div className="fixed top-0 left-[-9999px] w-[552px] bg-white">
          {employee && (
            <EmployeePdfContent
              ref={contentRef}
              primaryInfo={
                <EmployeePrimaryInfo
                  photo={employee.photo}
                  status={employee.status}
                  name={employee.name}
                  position={employee.position}
                  franchise={employee.franchise}
                  department={employee.department}
                />
              }
              roles={employee.roles || []}
              emailInfo={
                <EmployeeContacts
                  type="email"
                  corpContact={employee.emailCorporate || ""}
                  persContact={employee.emailPersonal || ""}
                />
              }
              phoneInfo={
                <EmployeeContacts
                  type="phone"
                  corpContact={employee.phoneCorporate || ""}
                  persContact={employee.phonePersonal || ""}
                />
              }
              leader={
                <LeaderPrimaryInfo
                  leaderName={employee.linearManager}
                  leaderPosition={employee.position}
                />
              }
              city={employee.city}
              birthday={employee.birthday || ""}
              linkSocialNetwork={employee.socialNetwork || ""}
              linkCV={employee.resumeLink || ""}
              linkProfile={employee.crmProfile || ""}
              aboutMe={employee.aboutMe || ""}
              tags={tagNames} // Передаем имена, а не ID
            />
          )}
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

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : employee ? (
          <>
            <div className="mt-0">
              <EmployeePrimaryInfo
                photo={employee.photo}
                status={employee.status}
                name={employee.name}
                position={employee.position}
                franchise={employee.franchise}
                department={employee.department}
              />
            </div>

            {employee.roles && employee.roles.length > 0 && (
              <div className="px-3 bg-gray-50 rounded-lg mb-0">
                <h3 className="text-[12px] font-semibold text-black mb-0">Роль</h3>
                <ul className="list-disc pl-4 space-y-0 mt-1">
                  {employee.roles.map((item, idx) => (
                    <li key={idx} className="text-[12px] text-black leading-tight">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tagNames.length > 0 && (
              <InfoSection icon={TagIcon} title="Компетенции">
                <CollapsibleBadgeList
                  visibleCount={3}
                  items={tagNames}
                  badgeClassName="bg-purple-50 text-purple-500 border-purple-500"
                />
              </InfoSection>
            )}

            <div className="grid grid-cols-2 gap-x-26 gap-y-3">
              <InfoSection icon={MailIcon} title="Электронная почта">
                <EmployeeContacts
                  type="email"
                  corpContact={employee.emailCorporate || ""}
                  persContact={employee.emailPersonal || ""}
                />
              </InfoSection>

              <InfoSection icon={PhoneIcon} title="Телефон">
                <EmployeeContacts
                  type="phone"
                  corpContact={employee.phoneCorporate || ""}
                  persContact={employee.phonePersonal || ""}
                />
              </InfoSection>

              <InfoSection icon={LocationIcon} title="Город">
                {employee.city ? (
                  <p className="text-[12px] text-black">{employee.city}</p>
                ) : (
                  <p className="text-[12px] text-gray-500">город не указан</p>
                )}
              </InfoSection>

              <InfoSection icon={CalendarIcon} title="День рождения">
                {employee.birthday ? (
                  <p className="text-[12px] text-black">
                    {new Date(employee.birthday).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                ) : (
                  <p className="text-[12px] text-gray-500">дата рождения не указана</p>
                )}
              </InfoSection>

              <InfoSection icon={DocumentIcon} title="Документы">
                {employee.resumeLink || employee.crmProfile ? (
                  <div className="flex flex-col gap-1">
                    {employee.resumeLink && (
                      <a
                        href={employee.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit text-[12px] text-link hover:underline"
                      >
                        Резюме
                      </a>
                    )}
                    {employee.crmProfile && (
                      <a
                        href={employee.crmProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit text-[12px] text-link hover:underline"
                      >
                        Профиль в CRM
                      </a>
                    )}
                  </div>
                ) : (
                  <p className="text-[12px] text-gray-500">документы не указаны</p>
                )}
              </InfoSection>

              <InfoSection icon={DocumentIcon} title="Социальная сеть">
                {employee.socialNetwork ? (
                  <a
                    href={employee.socialNetwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-link hover:underline"
                  >
                    Ссылка
                  </a>
                ) : (
                  <p className="text-[12px] text-gray-500">ссылка не указана</p>
                )}
              </InfoSection>

              <InfoSection icon={LeaderIcon} title="Руководитель">
                {employee.linearManager ? (
                  <LeaderPrimaryInfo
                    leaderName={employee.linearManager}
                    leaderPosition={employee.position}
                  />
                ) : (
                  <p className="text-[12px] text-gray-500">руководитель не указан</p>
                )}
              </InfoSection>
            </div>

            {employee.aboutMe && (
              <div className="p-3 bg-gray-50 rounded-lg my-0">
                <h3 className="text-[12px] body-overline-semibold text-black">
                  Обо мне
                </h3>
                <p className="text-[12px] text-black leading-relaxed">{employee.aboutMe}</p>
              </div>
            )}

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
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Сотрудник не найден
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};