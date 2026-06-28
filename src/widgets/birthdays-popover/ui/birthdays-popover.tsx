import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Button } from "@ui/button";
import BirthdayIcon from "@/shared/assets/icons/birthday.svg";
import { BirthdaysPopoverContent } from "./birthdays-popover-content";
import { BirthdaysModal } from "./birthdays-modal";
import { useBirthdays } from "../hooks/use-birthdays";

export const BirthdaysPopover = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
  const {
    todayBirthdays,
    currentMonthBirthdays,
    isLoading,
    error,
    hasBirthdaysToday,
    refetch,
  } = useBirthdays();

  const handleOpenModal = () => {
    setIsPopoverOpen(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePopoverOpenChange = (open: boolean) => {
    setIsPopoverOpen(open);
    if (open) {
      refetch();
    }
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={handlePopoverOpenChange}>
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
          {isLoading ? (
            <div className="flex justify-center py-6">
              <span className="text-gray-500">Загрузка...</span>
            </div>
          ) : error ? (
            <div className="flex justify-center py-6">
              <span className="text-red-500">{error}</span>
            </div>
          ) : (
            <BirthdaysPopoverContent
              todayBirthdays={todayBirthdays}
              onOpenModal={handleOpenModal}
              hasBirthdays={todayBirthdays.length > 0}
            />
          )}
        </PopoverContent>
      </Popover>

      <BirthdaysModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        birthdays={currentMonthBirthdays}
        isLoading={isLoading && currentMonthBirthdays.length === 0}
      />
    </>
  );
};