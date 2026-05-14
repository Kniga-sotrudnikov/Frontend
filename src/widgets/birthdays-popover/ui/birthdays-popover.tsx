import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
  getTodayBirthdays,
  getCurrentMonthBirthdays,
} from "@/mock-data/birthdays";
import BirthdayIcon from "@/shared/assets/icons/birthday.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import CakeImage from "@/shared/assets/images/cake.png";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";

// TODO: Заменить в будущем на автатар User
const AvatarPlaceholder = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200">
      <span className="text-xs font-medium text-gray-600">{initials}</span>
    </div>
  );
};

export const BirthdaysPopover = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const todayBirthdays = getTodayBirthdays();
  const currentMonthBirthdays = getCurrentMonthBirthdays();
  const hasBirthdaysToday = todayBirthdays.length > 0;

  const handleOpenModal = () => {
    setIsPopoverOpen(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            className="relative flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-purple-100"
            aria-label="Дни рождения"
          >
            <img src={BirthdayIcon} alt="" className="h-5 w-5" />
            {hasBirthdaysToday && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 ring-2 ring-white" />
            )}
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[387px] rounded-lg border border-gray-100 bg-white p-3 shadow-none"
          align="start"
          sideOffset={8}
        >
          <div className="flex flex-col gap-3 translate-x-[4px] -translate-y-[6px]">
            <span className="font-montserrat mt-0.5 text-xs font-semibold leading-5 tracking-[0.5px] text-gray-900">
              Сегодня
            </span>

            <div className="flex flex-col">
              {todayBirthdays.length > 0 ? (
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

            <button
              onClick={handleOpenModal}
              className="w-full text-left font-montserrat text-[12px] font-normal leading-[12px] tracking-[0.1px] text-blue-600 hover:text-blue-700"
            >
              Дни рождения в этом месяце
            </button>
          </div>
        </PopoverContent>
      </Popover>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[440px] max-w-[440px] rounded-lg border border-gray-200 bg-white p-0 shadow-none">
          <div className="relative px-5 py-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 flex h-5 w-5 items-center justify-center"
            >
              <img src={CloseIcon} alt="Закрыть" className="h-3 w-3" />
            </button>

            <div className="mb-4 flex justify-center">
              <img
                src={CakeImage}
                alt="Birthday cake"
                className="h-[100px] w-[100px] object-contain"
              />
            </div>

            {/* Заголовок */}
            <DialogTitle className="mb-3 text-start font-montserrat text-sm font-semibold leading-[15px] tracking-[0.25px] text-gray-900">
              Дни рождения в этом месяце
            </DialogTitle>

            {/* Список именинников */}
            <div className="max-h-[300px] overflow-y-auto">
              {currentMonthBirthdays.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {currentMonthBirthdays.map((birthday, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-1"
                    >
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
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <span className="body-s text-gray-500">
                    В этом месяце нет дней рождения
                  </span>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
