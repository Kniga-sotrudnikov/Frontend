import { useState } from "react";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { UploadOrgStructure } from "./upload-org-structure";

interface ClarifyingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ClarifyingModal({ open, onOpenChange }: ClarifyingModalProps) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader className="justify-center">
            <DialogTitle>Обновить схему?</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-foreground">
            После загрузки нового изображения текущая схема компании будет
            удалена.
          </DialogDescription>
          <DialogFooter className="gap-3 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Отменить
            </Button>
            <Button
              onClick={() => {
                onOpenChange(false);
                setIsUploadOpen(true);
              }}
            >
              Обновить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <UploadOrgStructure open={isUploadOpen} onOpenChange={setIsUploadOpen} />
    </>
  );
}

export { ClarifyingModal };
