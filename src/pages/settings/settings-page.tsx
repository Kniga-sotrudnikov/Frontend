import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";

const SettingsPage = () => {
  return (
    <div>
      <PageHeader
        title="Настройки"
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        birthday={<BirthdaysPopover />}
        user={<HeaderUserCard />}
      />
      <div className="p-6">Настройки. В работе...</div>
    </div>
  );
};

export const Component = SettingsPage;
