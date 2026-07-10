import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";

const ProjectsPage = () => {
  return (
    <div>
      <PageHeader
        title="Проекты"
        birthday={<BirthdaysPopover />}
        user={<HeaderUserCard />}
      />
      <div className="p-6">Проекты. В работе...</div>
    </div>
  );
};

export const Component = ProjectsPage;
