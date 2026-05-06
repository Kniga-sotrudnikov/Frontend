import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";

const OrgStructurePage = () => {
   // TODO: взять из стора или API
   const userData = {
    avatar: "", // пока пусто, будет использоваться первая буква имени
    name: "Алексеева Виктория",
    position: "HR-специалист",
  };

  
  return (
    <div>
      <PageHeader
        title="Оргструктура"
        stats={<span>144 сотрудников, 4 направления, 7 СИС</span>}
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        user={userData}
      />
      <div className="p-6">Орг структура. В работе...</div>
    </div>
  );
};

export const Component = OrgStructurePage;
