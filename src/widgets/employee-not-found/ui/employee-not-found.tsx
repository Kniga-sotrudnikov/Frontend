import { Button } from "@ui/button";
import NotFoundImage from "@/shared/assets/images/search-employee-not-found.svg";
import { useNotificationStore } from "@/shared/model/stores";

interface EmployeeNotFoundProps {
  searchQuery?: string;
  onClearSearch?: () => void;
  onShowAll?: () => void;
}

export const EmployeeNotFound = ({
  searchQuery = "Иванов Иван Иванович",
  onClearSearch,
  onShowAll,
}: EmployeeNotFoundProps) => {
  const addNotification = useNotificationStore((state) => state.add);

  const handleNotification = () => {
    addNotification({
      type: "info",
      title: "Функция в разработке",
      message: "Функция в разработке",
    });
  };

  return (
    <div className="flex flex-col items-center py-12 px-4">
      {/* Заголовок */}
      <h3 className="h3 mb-2 text-center text-purple-400">
        Сотрудник не найден
      </h3>

      {/* Подзаголовок */}
      <p className="body-s mb-3 text-center text-gray-600">
        По запросу "{searchQuery}" ничего не нашли.
        <br />
        Попробуйте изменить фильтры или запрос.
      </p>

      {/* Кнопки */}
      <div className="flex flex-row items-center justify-center gap-[25px] mt-1">
        <Button
          variant="default"
          size="default"
          onClick={onClearSearch || handleNotification}
          className="h-7 w-[150px] rounded-[8px] bg-purple-500 px-4 text-xs text-white hover:bg-purple-400"
        >
          Очистить поиск
        </Button>
        <Button
          variant="outline"
          size="default"
          onClick={onShowAll || handleNotification}
          className="h-7 w-[235px] rounded-[8px] border-purple-500 bg-white px-4 text-xs text-black hover:bg-purple-100"
        >
          Показать всех сотрудников
        </Button>
      </div>

      {/* Картинка внизу */}
      <div className="flex justify-center mt-3">
        <img
          src={NotFoundImage}
          alt="Сотрудник не найден"
          className="h-auto w-full max-w-[436px]"
        />
      </div>
    </div>
  );
};
