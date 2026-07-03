import { useState, useRef } from "react";

interface ZoomableImageProps {
  src: string;
  alt?: string;
  zoom: number;
}

export const ZoomableImage = ({ src, alt, zoom }: ZoomableImageProps) => {
  const [offset, setOffset] = useState({ x: 0.5, y: 0.5 });
  const dragStart = useRef<{
    mouseX: number;
    mouseY: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const zoomFactor = zoom / 100;
  const size = 1 / zoomFactor;
  const insetX = offset.x * (1 - size);
  const insetY = offset.y * (1 - size);
  const objectViewBox = `inset(${insetY * 100}% ${(1 - insetX - size) * 100}% ${(1 - insetY - size) * 100}% ${insetX * 100}%)`;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 100) return;

    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!dragStart.current || zoom <= 100) return;

    const dx =
      (dragStart.current.mouseX - e.clientX) / e.currentTarget.clientWidth;
    const dy =
      (dragStart.current.mouseY - e.clientY) / e.currentTarget.clientHeight;
    setOffset({
      x: Math.min(1, Math.max(0, dragStart.current.offsetX + dx / (1 - size))),
      y: Math.min(1, Math.max(0, dragStart.current.offsetY + dy / (1 - size))),
    });
  };

  const handleMouseUp = () => {
    dragStart.current = null;
  };

  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="block h-auto max-h-full w-full select-none rounded-2xl border border-border min-[1600px]:mx-auto min-[1600px]:h-full min-[1600px]:w-auto min-[1600px]:max-w-full"
      style={{
        objectFit: zoom > 100 ? "cover" : "contain",
        objectPosition: "top left",
        objectViewBox,
        cursor: zoom > 100 ? "grab" : "default",
      }}
    />
  );
};
