import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";

const HelpPage = () => {
  return (
    <div>
      <PageHeader
        title="Помощь"
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        birthday={<BirthdaysPopover />}
        user={<HeaderUserCard />}
      />
      <div className="p-6">Помощь. В работе...</div>
    </div>
  );
};

export const Component = HelpPage;
