import { forwardRef } from "react";
import type { ReactElement } from "react";
import { InfoSection } from "@/shared/ui/info-section";
import { CollapsibleBadgeList } from "@/shared/ui/collapsible-badge-list";
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
    const formattedBirthday = new Date(birthday).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });

    return (
      <div
        ref={ref}
        className="bg-white px-4 pb-4 max-w-[552px]"
        style={{
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Основная информация - оборачиваем чтобы убрать лишние отступы */}
        <div className="mt-0">{primaryInfo}</div>

        {/* Роли */}
        {roles.length > 0 && (
          <div className="bg-gray-50 rounded-lg px-3 py-2 mt-4">
            <h3 className="text-[12px] font-semibold text-black mb-1">Роль</h3>
            <ul className="list-disc pl-4 space-y-0">
              {roles.map((item, idx) => (
                <li key={idx} className="text-[12px] text-black leading-tight">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Компетенции */}
        <div className="mt-4">
          <InfoSection icon={TagIcon} title="Компетенции">
            <CollapsibleBadgeList
              visibleCount={10}
              items={tags}
              badgeClassName="bg-purple-50 text-purple-500 border-purple-500"
            />
          </InfoSection>
        </div>

        {/* Контакты и информация */}
        <div className="grid grid-cols-2 gap-x-26 gap-y-3 mt-4">
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
              {linkCV && (
                <span className="w-fit text-[12px] text-link">Резюме</span>
              )}
              {linkProfile && (
                <span className="w-fit text-[12px] text-link">
                  Профиль в CRM
                </span>
              )}
            </div>
          </InfoSection>

          <InfoSection icon={DocumentIcon} title="Социальная сеть">
            {linkSocialNetwork ? (
              <span className="text-[12px] text-link">Ссылка</span>
            ) : (
              <span className="text-[12px] text-gray-400">Не указана</span>
            )}
          </InfoSection>

          <InfoSection icon={LeaderIcon} title="Руководитель">
            {leader}
          </InfoSection>
        </div>

        {/* Обо мне */}
        {aboutMe && (
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
