import { forwardRef } from "react";
import type { ReactElement } from "react";
import { PdfInfoSection } from "./pdf-info-section";
import TagIcon from "@/shared/assets/icons/tag.svg";
import MailIcon from "@/shared/assets/icons/mail.svg";
import PhoneIcon from "@/shared/assets/icons/phone.svg";
import LocationIcon from "@/shared/assets/icons/location.svg";
import CalendarIcon from "@/shared/assets/icons/calendar.svg";
import DocumentIcon from "@/shared/assets/icons/document.svg";
import LeaderIcon from "@/shared/assets/icons/leader.svg";

interface EmployeePdfContentProps {
  primaryInfo: ReactElement;
  roles: string[];
  emailInfo: ReactElement;
  phoneInfo: ReactElement;
  leader: ReactElement;
  city: string;
  birthday: string;
  linkSocialNetwork: string;
  linkCV: string;
  linkProfile: string;
  aboutMe: string;
  tags: string[];
}

export const EmployeePdfContent = forwardRef<
  HTMLDivElement,
  EmployeePdfContentProps
>(
  (
    {
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
    },
    ref,
  ) => {
    const formattedBirthday = birthday
      ? new Date(birthday).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
        })
      : null;

    const hasRoles = roles && roles.length > 0;
    const hasTags = tags && tags.length > 0;
    const hasAboutMe = aboutMe && aboutMe.trim().length > 0;
    const hasCity = city && city.trim().length > 0;
    const hasBirthday =
      formattedBirthday !== null && !isNaN(new Date(birthday).getTime());
    const hasLinkCV = linkCV && linkCV.trim().length > 0;
    const hasLinkProfile = linkProfile && linkProfile.trim().length > 0;
    const hasSocialNetwork =
      linkSocialNetwork && linkSocialNetwork.trim().length > 0;
    const hasDocuments = hasLinkCV || hasLinkProfile;
    const hasLeader = leader !== null && leader !== undefined;

    return (
      <div ref={ref} className="bg-white px-4 pb-8 max-w-[552px] wrap-anywhere">
        <div className="mt-0">{primaryInfo}</div>

        {hasRoles && (
          <div className="bg-gray-50 rounded-lg px-3 py-2 mt-4">
            <h3 className="text-[12px] font-semibold text-black m-0">Роль</h3>
            <ul className="list-disc pl-4 space-y-0 mt-0">
              {roles.map((item, idx) => (
                <li key={idx} className="text-[12px] text-black leading-tight">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasTags && (
          <div className="mt-4">
            <PdfInfoSection icon={TagIcon} title="Компетенции">
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] p-[2px_4px] rounded-[4px] bg-purple-50 text-purple-500 border border-purple-500 inline-flex h-[24px] box-border leading-[4px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </PdfInfoSection>
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-26 gap-y-3 mt-4">
          <PdfInfoSection icon={MailIcon} title="Электронная почта">
            {emailInfo}
          </PdfInfoSection>

          <PdfInfoSection icon={PhoneIcon} title="Телефон">
            {phoneInfo}
          </PdfInfoSection>

          <PdfInfoSection icon={LocationIcon} title="Город">
            {hasCity ? (
              <p className="text-[12px] text-black">{city}</p>
            ) : (
              <p className="text-[12px] text-gray-400">город не указан</p>
            )}
          </PdfInfoSection>

          <PdfInfoSection icon={CalendarIcon} title="День рождения">
            {hasBirthday ? (
              <p className="text-[12px] text-black">{formattedBirthday}</p>
            ) : (
              <p className="text-[12px] text-gray-400">
                дата рождения не указана
              </p>
            )}
          </PdfInfoSection>

          <PdfInfoSection icon={DocumentIcon} title="Документы">
            {hasDocuments ? (
              <div className="flex flex-col gap-1">
                {hasLinkCV && (
                  <span className="text-[12px] text-link">Резюме</span>
                )}
                {hasLinkProfile && (
                  <span className="text-[12px] text-link">Профиль в CRM</span>
                )}
              </div>
            ) : (
              <p className="text-[12px] text-gray-400">документы не указаны</p>
            )}
          </PdfInfoSection>

          <PdfInfoSection icon={DocumentIcon} title="Социальная сеть">
            {hasSocialNetwork ? (
              <span className="text-[12px] text-link">Ссылка</span>
            ) : (
              <p className="text-[12px] text-gray-400">ссылка не указана</p>
            )}
          </PdfInfoSection>

          <PdfInfoSection icon={LeaderIcon} title="Руководитель">
            {hasLeader ? (
              leader
            ) : (
              <p className="text-[12px] text-gray-400">
                руководитель не указан
              </p>
            )}
          </PdfInfoSection>
        </div>

        {hasAboutMe && (
          <div className="p-3 bg-gray-50 rounded-lg mt-4">
            <h3 className="text-[12px] body-overline-semibold text-black">
              Обо мне
            </h3>
            <p className="text-[12px] text-black leading-relaxed">{aboutMe}</p>
          </div>
        )}
      </div>
    );
  },
);

EmployeePdfContent.displayName = "EmployeePdfContent";
