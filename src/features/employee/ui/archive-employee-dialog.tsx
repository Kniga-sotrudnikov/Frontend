import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";
import { Button } from "@ui/button";

type TArchiveEmployeeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export const ArchiveEmployeeDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: TArchiveEmployeeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col gap-8 w-84">
        <div className="flex flex-col items-center gap-2">
          <DialogHeader>
            <DialogTitle className="text-lg font-semi-bold">
              Архивировать сотрудника?
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="text-center w-[80%] text-(--color-black) tracking-wide">
            Сотрудник будет перемещён в раздел «Архив».
          </DialogDescription>
        </div>

        <DialogFooter className="flex justify-center gap-3">
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Отменить
          </Button>
          <Button onClick={onConfirm}>Архивировать</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
