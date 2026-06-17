type InfoSectionProps = {
  icon: string;
  title: string;
  children: React.ReactNode;
};

export const InfoSection = ({ icon, title, children }: InfoSectionProps) => {
  return (
    <div className="flex gap-1">
      <img src={icon} alt="" className="size-3 shrink-0 mt-0.5" />

      <div className="flex flex-col gap-1 min-w-0 w-fit">
        <h3 className="text-[12px] font-semibold leading-[15px]">{title}</h3>

        {children}
      </div>
    </div>
  );
};