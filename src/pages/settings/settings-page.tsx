import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";

const SettingsPage = () => {
   // TODO: взять из стора или API
   const userData = {
    avatar: "", // пока пусто, будет использоваться первая буква имени
    name: "Алексеева Виктория",
    position: "HR-специалист",
  };

  
  return (
    <div>
      <PageHeader 
        title="Настройки"
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        user={userData}
        />
      <div className="p-6">Настройки. В работе...</div>
    </div>
  );
};

export const Component = SettingsPage;