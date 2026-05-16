import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import {
  getTodayBirthdays,
  getCurrentMonthBirthdays,
} from "@/entities/employee";
import { Button } from "@ui/button";
import BirthdayIcon from "@/shared/assets/icons/birthday.svg";
import { BirthdaysPopoverContent } from "./birthdays-popover-content";
import { BirthdaysModal } from "./birthdays-modal";

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Дни рождения"
          >
            <img src={BirthdayIcon} alt="" className="h-5 w-5" />
            {hasBirthdaysToday && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-purple-500 ring-2 ring-white" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-[387px] rounded-lg border border-gray-100 bg-white p-3 shadow-none"
          align="start"
          sideOffset={8}
        >
          <BirthdaysPopoverContent
            todayBirthdays={todayBirthdays}
            onOpenModal={handleOpenModal}
          />
        </PopoverContent>
      </Popover>

      <BirthdaysModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        birthdays={currentMonthBirthdays}
      />
    </>
  );
};
