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
    const formattedBirthday = new Date(birthday).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
    });

    return (
      <div
        ref={ref}
        style={{
          backgroundColor: "#ffffff",
          padding: "16px 16px 64px 16px",
          maxWidth: "552px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ marginTop: 0 }}>{primaryInfo}</div>

        {roles.length > 0 && (
          <div
            style={{
              backgroundColor: "#F9FAFB",
              borderRadius: "8px",
              padding: "8px 12px",
              marginTop: "16px",
            }}
          >
            <h3
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#141615",
                margin: "0",
              }}
            >
              Роль
            </h3>
            <ul style={{ margin: 0, paddingLeft: "16px" }}>
              {roles.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    fontSize: "12px",
                    color: "#141615",
                    lineHeight: "1.5",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ marginTop: "16px" }}>
          <PdfInfoSection icon={TagIcon} title="Компетенции">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "12px",
                    padding: "2px 4px",
                    borderRadius: "4px",
                    backgroundColor: "#F3ECFF",
                    color: "#5100D2",
                    border: "1px solid #5100D2",
                    display: "inline-flex",
                    height: "24px",
                    boxSizing: "border-box",
                    lineHeight: "4px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </PdfInfoSection>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px 24px",
            marginTop: "16px",
          }}
        >
          <PdfInfoSection icon={MailIcon} title="Электронная почта">
            {emailInfo}
          </PdfInfoSection>

          <PdfInfoSection icon={PhoneIcon} title="Телефон">
            {phoneInfo}
          </PdfInfoSection>

          <PdfInfoSection icon={LocationIcon} title="Город">
            <p style={{ fontSize: "12px", color: "#141615", margin: 0 }}>
              {city}
            </p>
          </PdfInfoSection>

          <PdfInfoSection icon={CalendarIcon} title="День рождения">
            <p style={{ fontSize: "12px", color: "#141615", margin: 0 }}>
              {formattedBirthday}
            </p>
          </PdfInfoSection>

          <PdfInfoSection icon={DocumentIcon} title="Документы">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {linkCV && (
                <span style={{ fontSize: "12px", color: "#2B55FF" }}>
                  Резюме
                </span>
              )}
              {linkProfile && (
                <span style={{ fontSize: "12px", color: "#2B55FF" }}>
                  Профиль в CRM
                </span>
              )}
            </div>
          </PdfInfoSection>

          <PdfInfoSection icon={DocumentIcon} title="Социальная сеть">
            {linkSocialNetwork ? (
              <span style={{ fontSize: "12px", color: "#2B55FF" }}>Ссылка</span>
            ) : (
              <span style={{ fontSize: "12px", color: "#9CA3AF" }}>
                Не указана
              </span>
            )}
          </PdfInfoSection>

          <PdfInfoSection icon={LeaderIcon} title="Руководитель">
            {leader}
          </PdfInfoSection>
        </div>

        {aboutMe && (
          <div
            style={{
              backgroundColor: "#F9FAFB",
              borderRadius: "8px",
              padding: "12px",
              marginTop: "16px",
            }}
          >
            <h3
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#141615",
                margin: "0 0 4px 0",
              }}
            >
              Обо мне
            </h3>
            <p
              style={{
                fontSize: "12px",
                color: "#141615",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              {aboutMe}
            </p>
          </div>
        )}
      </div>
    );
  },
);

EmployeePdfContent.displayName = "EmployeePdfContent";
