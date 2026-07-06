import { useState } from "react";
import { Dialog, DialogContent, DialogClose } from "@ui/dialog";
import { Button } from "@/shared/ui/button";

interface AddTagModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTag: (tagName: string) => void;
  isLoading?: boolean;
}

export const AddTagModal = ({
  open,
  onOpenChange,
  onAddTag,
  isLoading = false,
}: AddTagModalProps) => {
  const [tagName, setTagName] = useState("");

  const resetForm = () => {
    setTagName("");
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  const handleAdd = () => {
    if (tagName.trim()) {
      onAddTag(tagName.trim());
      resetForm();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-92! rounded-8 gap-3 p-5 flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="body-l-semibold text-gray-900">Добавление тега</h2>
          <DialogClose variant="icon" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="body-s text-black">Название</label>
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="Введите тег"
            disabled={isLoading}
            className="px-4 py-2.5 body-m text-black placeholder:text-gray-600 border border-gray-200 rounded-8 
                     focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500
                     disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div className="border-t border-gray-200" />

        <div className="flex justify-start gap-3 shrink-0">
          <DialogClose variant="custom" asChild>
            <Button
              variant="outline"
              size="plain"
              className="button-small px-3.5 h-8"
              disabled={isLoading}
            >
              Отменить
            </Button>
          </DialogClose>
          <Button
            variant="default"
            size="plain"
            className="button-small px-5.75 h-8"
            onClick={handleAdd}
            disabled={!tagName.trim() || isLoading}
          >
            {isLoading ? "Добавление..." : "Добавить"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};