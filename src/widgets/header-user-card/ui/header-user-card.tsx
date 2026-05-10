import ArrowDownIcon from "@/shared/assets/icons/arrow-down.svg";

interface HeaderUserCardProps {
  name: string;
  position: string;
  avatar?: string;
}

export function HeaderUserCard({ name, position, avatar }: HeaderUserCardProps) {
  // Получаем первую букву имени для аватара-заглушки
  const firstLetter = name.charAt(0);

  return (
    <div className="flex h-[60px] w-[303px] items-center gap-3 rounded-lg bg-gray-25 px-2 py-1">
      {/* Аватар */}
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="h-11 w-11 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-100 text-purple-600">
          <span className="text-lg font-semibold">{firstLetter}</span>
        </div>
      )}

      {/* Имя и должность */}
      <div className="flex flex-col gap-1">
        <span className="body-m-semibold whitespace-nowrap text-black">
          {name}
        </span>
        <span className="body-m text-black">{position}</span>
      </div>

      {/* Стрелка вниз */}
      <img
        src={ArrowDownIcon}
        alt=""
        className="ml-auto h-5 w-5 shrink-0"
      />
    </div>
  );
}