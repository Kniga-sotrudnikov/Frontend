import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";

const OrgStructurePage = () => {
  return (
    <div>
      <PageHeader
        title="Оргструктура"
        stats={<span>144 сотрудников, 4 направления, 7 СИС</span>}
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        user={<HeaderUserCard name="Алексеева Виктория" position="HR-специалист" />}
      />
      <div className="p-6">Орг структура. В работе...</div>
    </div>
  );
};

export const Component = OrgStructurePage;
