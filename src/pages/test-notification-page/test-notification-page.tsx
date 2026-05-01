import { useNotificationStore } from "@/shared/model/stores/use-notification-store";

export const TestNotificationPage = () => {
  const add = useNotificationStore((state) => state.add);

  const notifications = [
    {
      name: "Карточка сотрудника создана",
      handler: () =>
        add({
          iconType: "success",
          title: "Карточка сотрудника создана",
          actions: [
            { label: "Открыть", onClick: () => alert("Открыть") },
            { label: "Добавить еще", onClick: () => alert("Добавить еще") },
          ],
          duration: 0,
        }),
    },
    {
      name: "Карточка сотрудника изменена",
      handler: () =>
        add({
          iconType: "success",
          title: "Карточка сотрудника изменена",
          actions: [
            { label: "Отменить", onClick: () => alert("Отменить") },
            {
              label: "Открыть карточку",
              onClick: () => alert("Открыть карточку"),
            },
          ],
        }),
    },
    {
      name: "День рождения (с подзаголовком)",
      handler: () =>
        add({
          iconType: "birthday",
          title: "У Марии Ивановой день рождения через 15 дней",
          message: "Не забудьте поздравить!",
          duration: 0,
        }),
    },
    {
      name: "Много уведомлений (5 штук)",
      handler: () => {
        for (let i = 1; i <= 5; i++) {
          setTimeout(() => {
            add({
              iconType: "success",
              title: `Уведомление ${i}`,
              message: `Это тестовое уведомление номер ${i}`,
            });
          }, i * 200);
        }
      },
    },
    {
      name: "Очистить все",
      handler: () => useNotificationStore.getState().clearAll(),
      variant: "destructive",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Тестирование уведомлений</h1>
      <div className="flex flex-wrap gap-3">
        {notifications.map((n) => (
          <button
            key={n.name}
            onClick={n.handler}
            className={`px-4 py-2 rounded text-white ${
              n.variant === "destructive"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {n.name}
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <p className="text-sm text-gray-600">
          📍 Уведомления появляются в правом нижнем углу (фиксированная ширина
          473px)
        </p>
        <p className="text-sm text-gray-600">
          ⏱️ По умолчанию исчезают через 4 секунды
        </p>
      </div>
    </div>
  );
};
