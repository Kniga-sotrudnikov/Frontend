type InfoSectionProps = {
  icon: string;
  title: string;
  children: React.ReactNode;
};

export const InfoSection = ({ icon, title, children }: InfoSectionProps) => {
  return (
    <div className="flex gap-1">
      <img src={icon} alt="" className="size-4 shrink-0" />

      <div className="flex flex-col gap-2 min-w-0 w-fit">
        <h3 className="text-xs font-bold">{title}</h3>

        {children}
      </div>
    </div>
  );
};
