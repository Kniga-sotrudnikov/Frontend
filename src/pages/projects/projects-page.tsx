import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";

const ProjectsPage = () => {
   // TODO: взять из стора или API
   const userData = {
    avatar: "", // пока пусто, будет использоваться первая буква имени
    name: "Алексеева Виктория",
    position: "HR-специалист",
  };

  
  return (
    <div>
      <PageHeader
        title="Проекты"
        search={<SearchInput placeholder="Найти проект" />}
        user={userData}
      />
      <div className="p-6">Проекты. В работе...</div>
    </div>
  );
};

export const Component = ProjectsPage;