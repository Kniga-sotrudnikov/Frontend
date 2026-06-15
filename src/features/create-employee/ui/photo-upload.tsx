import { useState, useRef, useEffect } from "react";
import { cn } from "@/shared/lib";
import { Button } from "@ui/button";
import CloseIcon from "@/shared/assets/icons/close.svg?react";
import defaultAvatar from "@/shared/assets/images/avatar-placeholder.jpg";

interface PhotoUploadProps {
  value?: File | string;
  onChange: (file?: File) => void;
  error?: string;
}

export const PhotoUpload = ({ value, onChange, error }: PhotoUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }
    if (typeof value === "string") {
      setPreviewUrl(value);
    } else {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0] && files[0].type.startsWith("image/")) {
      onChange(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      onChange(files[0]);
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "flex flex-row items-center gap-2 p-3 rounded-md border border-dashed transition-colors",
          dragActive && "border-purple-500 bg-purple-50",
          error && "border-red-600",
          !dragActive && !error && "border-gray-200",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="relative w-[106px] h-[94px] shrink-0 bg-gray-100 rounded-md overflow-hidden">
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Preview"
                className="size-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon-xs"
                className="absolute -top-1 -right-1 rounded-full size-5"
                onClick={() => onChange(undefined)}
              >
                <CloseIcon className="size-2.5" />
              </Button>
            </>
          ) : (
            <img
              src={defaultAvatar}
              alt="Avatar placeholder"
              className="size-full object-cover opacity-50"
            />
          )}
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <p className="text-xs text-black leading-5 tracking-[-0.5px]">
            Перетащите фотографию сюда или{" "}
            <Button
              type="button"
              variant="link"
              size="plain"
              className="text-xs text-purple-500 hover:underline p-0 h-auto leading-5 tracking-[-0.5px]"
              onClick={() => inputRef.current?.click()}
            >
              Выберите файл
            </Button>
          </p>
          <p className="text-[12px] text-gray-600 leading-[6px]">
            Поддерживается: JPG, PNG
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};
