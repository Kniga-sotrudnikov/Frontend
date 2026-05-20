import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";
import { HeaderUserCard } from "@/widgets/header-user-card";
import { BirthdaysPopover } from "@/widgets/birthdays-popover";
import { EmployeeNotFound } from "@/widgets/employee-not-found";

const SettingsPage = () => {
  return (
    <div>
      <PageHeader 
        title="Настройки"
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        birthday={<BirthdaysPopover />}
        user={<HeaderUserCard name="Алексеева Виктория" position="HR-специалист" />}
        />
      <div className="p-6">Настройки. В работе...</div>
      {/*Вставил сюда временно,для демонстрации */}
      <EmployeeNotFound></EmployeeNotFound>
    </div>
  );
};

export const Component = SettingsPage;