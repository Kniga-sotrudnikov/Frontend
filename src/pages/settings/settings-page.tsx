import { SearchInput } from "@/shared/ui/input";
import { PageHeader } from "@/widgets/page-header";

const TemporaryUserProfile = () => (
  <div className="flex h-[60px] w-[303px] items-center gap-3 rounded-lg bg-gray-25 px-2 py-1">
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-purple-600">
      <span className="text-lg font-semibold">А</span>
    </div>
    <div className="flex flex-col gap-1">
      <span className="body-m-semibold whitespace-nowrap text-black">Алексеева Виктория</span>
      <span className="body-m text-black">HR-специалист</span>
    </div>
    <img src="/src/shared/assets/icons/arrow-down.svg" alt="" className="ml-auto h-5 w-5" />
  </div>
);

const SettingsPage = () => {
  return (
    <div>
      <PageHeader 
        title="Настройки"
        search={<SearchInput placeholder="Поиск по ФИО, должности, тегам..." />}
        user={<TemporaryUserProfile />}
        />
      <div className="p-6">Настройки. В работе...</div>
    </div>
  );
};

export const Component = SettingsPage;