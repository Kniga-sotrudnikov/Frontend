import type { ReactNode } from "react";

interface PdfInfoSectionProps {
  icon: string;
  title: string;
  children: ReactNode;
}

export const PdfInfoSection = ({ icon, title, children }: PdfInfoSectionProps) => {
  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "flex-start" }}>
      <img
        src={icon}
        alt=""
        style={{
          width: "12px",
          height: "12px",
          flexShrink: 0,
          marginTop: "8px",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
        <h3 style={{ 
          fontSize: "12px", 
          fontWeight: 600, 
          lineHeight: "15px",
          margin: 0,
          color: "#141615",
          marginBottom: "8px",
        }}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
};