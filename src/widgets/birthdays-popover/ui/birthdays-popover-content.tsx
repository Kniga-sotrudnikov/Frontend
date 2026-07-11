import { Button } from "@ui/button";
import { AvatarPlaceholder } from "./avatar-placeholder";
import type { BirthdayPerson } from "@/entities/employee";

interface BirthdaysPopoverContentProps {
  todayBirthdays: BirthdayPerson[];
  onOpenModal: () => void;
}

export const BirthdaysPopoverContent = ({
  todayBirthdays,
  onOpenModal,
}: BirthdaysPopoverContentProps) => {
  const hasBirthdays = todayBirthdays.length > 0;

  return (
    <div className="flex flex-col gap-3 translate-x-[4px] -translate-y-[6px]">
      <span className="font-montserrat mt-0.5 text-xs font-semibold leading-5 tracking-[0.5px] text-gray-900">
        Сегодня
      </span>

      <div className="flex flex-col">
        {hasBirthdays ? (
          todayBirthdays.map((birthday, index) => (
            <div key={index} className="p-1.5">
              <div className="flex items-center gap-2">
                <AvatarPlaceholder name={birthday.name} />
                <div className="flex flex-col gap-1">
                  <span className="font-montserrat text-[12px] font-normal leading-[12px] text-black">
                    {birthday.name}
                  </span>
                  <span className="font-montserrat text-[12px] font-normal leading-[12px] text-gray-600">
                    {birthday.date}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-3 text-center">
            <span className="font-montserrat text-xs text-gray-600">
              Сегодня нет дней рождений
            </span>
          </div>
        )}
      </div>

      <Button
        variant="link"
        size="xs"
        onClick={onOpenModal}
        className="w-full justify-start p-0 font-montserrat text-[12px] font-normal leading-[12px] tracking-[0.1px] text-blue-600 hover:text-blue-700"
      >
        Дни рождения в этом месяце
      </Button>
    </div>
  );
};