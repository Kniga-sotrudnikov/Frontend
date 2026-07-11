import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@ui/button";
import CloseIcon from "@/shared/assets/icons/close.svg";
import CakeImage from "@/shared/assets/images/cake.png";
import { AvatarPlaceholder } from "./avatar-placeholder";
import { BirthdaysEmptyState } from "./birthdays-empty-state";
import type { BirthdayPerson } from "@/entities/employee";

interface BirthdaysModalProps {
  isOpen: boolean;
  onClose: () => void;
  birthdays: BirthdayPerson[];
}

export const BirthdaysModal = ({
  isOpen,
  onClose,
  birthdays,
}: BirthdaysModalProps) => {
  const hasBirthdays = birthdays.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[440px] max-w-[440px] rounded-lg border border-gray-200 bg-white p-0 shadow-none">
        <div className="relative px-5 py-5">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-5 w-5 items-center justify-center"
            aria-label="Закрыть"
          >
            <img src={CloseIcon} alt="" className="h-3 w-3" />
          </Button>

          <div className="mb-4 flex justify-center">
            <img
              src={CakeImage}
              alt="Birthday cake"
              className="h-[100px] w-[100px] object-contain"
            />
          </div>

          <DialogTitle className="mb-3 text-start font-montserrat text-sm font-semibold leading-[15px] tracking-[0.25px] text-gray-900">
            Дни рождения в этом месяце
          </DialogTitle>

          <div className="max-h-[300px] overflow-y-auto">
            {hasBirthdays ? (
              <div className="flex flex-col gap-1">
                {birthdays.map((birthday, index) => (
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
              <BirthdaysEmptyState />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};