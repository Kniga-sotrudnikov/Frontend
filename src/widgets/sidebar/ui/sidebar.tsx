import { Link, NavLink } from "react-router";
import logoIcon from "@/widgets/sidebar/assets/symbol-logo.svg";
import UsersIcon from "src/shared/assets/icons/users.svg?react";
import TreeIcon from "src/shared/assets/icons/tree.svg?react";
import ProjectsIcon from "src/shared/assets/icons/project.svg?react";
import SettingsIcon from "src/shared/assets/icons/settings.svg?react";
import HelpIcon from "src/shared/assets/icons/help.svg?react";
import { Button } from "src/shared/ui/button";
import { ROUTES } from "src/shared/model/routes.ts";

const mainSidebarItems = [
  {
    to: ROUTES.EMPLOYEES,
    Icon: UsersIcon,
    label: "employee",
  },
  {
    to: ROUTES.ORG_STRUCTURE,
    Icon: TreeIcon,
    label: "structure",
  },
  {
    to: ROUTES.PROJECTS,
    Icon: ProjectsIcon,
    label: "projects",
  },
];

const footerSidebarItems = [
  {
    to: ROUTES.SETTINGS,
    Icon: SettingsIcon,
    label: "settings",
  },
  {
    to: ROUTES.HELP,
    Icon: HelpIcon,
    label: "help",
  },
];

export const Sidebar = () => {
  return (
    <aside className="flex flex-col justify-between px-6.5 py-10 border border-gray-200">
      <nav>
        <Link to={ROUTES.HOME} className="flex justify-center mb-9">
          <img
            src={logoIcon}
            alt="логотип книги сотрудников"
            width="32"
            height="32"
          />
        </Link>

        <ul className="flex flex-col gap-4">
          {mainSidebarItems.map(({ to, Icon, label }) => (
            <li key={label}>
              <Button
                asChild
                variant="ghost"
                size="icon-xl"
                className="aria-[current=page]:bg-purple-100 aria-[current=page]:text-purple-500"
              >
                <NavLink to={to}>
                  <Icon className="size-6" />
                </NavLink>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <nav>
        <ul className="flex flex-col gap-4">
          {footerSidebarItems.map(({ to, Icon, label }) => (
            <li key={label}>
              <Button
                asChild
                variant="ghost"
                size="icon-xl"
                className="aria-[current=page]:bg-purple-100 aria-[current=page]:text-purple-500"
              >
                <NavLink to={to}>
                  <Icon className="size-6" />
                </NavLink>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
