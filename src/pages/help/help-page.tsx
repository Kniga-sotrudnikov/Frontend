import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";

const HelpPage = () => {
  // TODO: взять из стора или API
  const userData = {
    avatar: "", // пока пусто, будет использоваться первая буква имени
    name: "Алексеева Виктория",
    position: "HR-специалист",
  };
  
  return (
    <div>
      <PageHeader
        title="Помощь"
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        user={userData}
      />
      <div className="p-6">Помощь. В работе...</div>
    </div>
  );
};

export const Component = HelpPage;
