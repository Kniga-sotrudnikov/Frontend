import { useEffect, useRef, useState } from "react";

interface ZoomableImageProps {
  src: string;
  alt?: string;
  zoom: number;
}

export const ZoomableImage = ({ src, alt, zoom }: ZoomableImageProps) => {
  const [offset, setOffset] = useState({ x: 0.5, y: 0.5 });
  const [naturalSize, setNaturalSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateContainerSize = () => {
      setContainerSize({
        width: el.clientWidth,
        height: el.clientHeight,
      });
    };

    updateContainerSize();

    const resizeObserver = new ResizeObserver(updateContainerSize);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  const frameSize =
    naturalSize && containerSize.width > 0 && containerSize.height > 0
      ? (() => {
          const imageRatio = naturalSize.width / naturalSize.height;
          const containerRatio = containerSize.width / containerSize.height;

          if (containerRatio > imageRatio) {
            return {
              width: containerSize.height * imageRatio,
              height: containerSize.height,
            };
          }

          return {
            width: containerSize.width,
            height: containerSize.width / imageRatio,
          };
        })()
      : null;

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setNaturalSize({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    });
  };

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
    <div ref={containerRef} className="h-full w-full overflow-hidden">
      <div
        className="relative overflow-hidden rounded-12"
        style={{
          width: frameSize?.width ?? "100%",
          height: frameSize?.height ?? "100%",
        }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          onLoad={handleImageLoad}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="h-full w-full"
          style={{
            objectFit: "contain",
            objectPosition: "top left",
            objectViewBox,
            cursor: zoom > 100 ? "grab" : "default",
          }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-12 border-2" />
      </div>
    </div>
  );
};
