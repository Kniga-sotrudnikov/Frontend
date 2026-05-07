import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";

const SettingsPage = () => {
  return (
    <div>
      <PageHeader 
        title="Настройки"
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        user={<HeaderUserCard name="Алексеева Виктория" position="HR-специалист" />}
        />
      <div className="p-6">Настройки. В работе...</div>
    </div>
  );
};

export const Component = SettingsPage;