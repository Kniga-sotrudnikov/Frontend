import { useState, useRef } from "react";
import type { DragEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import ImportIcon from "@/shared/assets/icons/import.svg?react";

interface UploadOrgStructureProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ACCEPTED_TYPES = ["application/pdf", "image/png", "image/jpeg"];
const MAX_SIZE_MB = 10;

function UploadOrgStructure({ open, onOpenChange }: UploadOrgStructureProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(incoming: File) {
    if (!ACCEPTED_TYPES.includes(incoming.type)) return;
    if (incoming.size > MAX_SIZE_MB * 1024 * 1024) return;
    setFile(incoming);
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave() {
    setIsDragging(false);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  }

  function handleClose() {
    setFile(null);
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) handleClose();
        else onOpenChange(value);
      }}
    >
      <DialogContent className="min-w-[420px] gap-3">
        <DialogHeader className="justify-center">
          <DialogTitle className="font-bold text-lg">
            Обновление файла оргструктуры
          </DialogTitle>
          <DialogDescription className="sr-only">
            Загрузите новый файл оргструктуры в формате PDF, PNG или JPG
          </DialogDescription>
        </DialogHeader>
        <div
          className={`min-w-[373px] bg-gray-50 border-3 border-dashed rounded-lg flex flex-col items-center gap-3 p-8 transition-colors ${
            isDragging ? "border-accent bg-accent/10" : ""
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <ImportIcon className="size-15 text-accent stroke-1" />
          {file ? (
            <p className="text-center font-medium">{file.name}</p>
          ) : (
            <>
              <p className="text-center">
                Перетяните файл или{" "}
                <button
                  type="button"
                  className="text-accent font-semibold hover:underline"
                  onClick={() => inputRef.current?.click()}
                >
                  выберите на компьютере
                </button>{" "}
                для загрузки
              </p>
              <p>PDF, PNG или JPG, не более 10 МБ</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => {
              const picked = e.target.files?.[0];
              if (picked) handleFile(picked);
            }}
          />
        </div>
        <DialogFooter className="justify-end gap-3">
          <Button variant="outline" onClick={handleClose}>
            Отмена
          </Button>
          <Button
            disabled={!file}
            className="disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100"
          >
            Обновить структуру
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { UploadOrgStructure };
