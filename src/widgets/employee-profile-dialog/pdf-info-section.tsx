import type { ReactNode } from "react";

interface PdfInfoSectionProps {
  icon: string;
  title: string;
  children: ReactNode;
}

export const PdfInfoSection = ({ icon, title, children }: PdfInfoSectionProps) => {
  return (
    <div className="flex gap-1 items-start">
      <img
        src={icon}
        alt=""
        className="size-3 shrink-0 mt-[8px]"
      />
      <div className="flex flex-col gap-[4px] min-w-0">
        <h3 className="text-[12px] font-semibold leading-[15px] text-[#141615] m-0 mb-[8px]">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
};