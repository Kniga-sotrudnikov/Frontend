import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";

const HelpPage = () => {
  return (
    <div>
      <PageHeader
        title="Помощь"
        birthday={<BirthdaysPopover />}
        user={<HeaderUserCard />}
      />
      <div className="p-6">Помощь. В работе...</div>
    </div>
  );
};

export const Component = HelpPage;
