import { useState, useRef, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { cn } from "@/shared/lib"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString()

interface ZoomablePDFProps {
  src: string
  zoom: number
  className?: string
}

export const ZoomablePDF = ({ src, zoom, className }: ZoomablePDFProps) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<{
    mouseX: number; mouseY: number
    scrollLeft: number; scrollTop: number
  } | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const centerScroll = () => {
    const el = containerRef.current
    if (!el) return
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
    el.scrollTop = (el.scrollHeight - el.clientHeight) / 2
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el || zoom <= 100) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragStart.current = {
      mouseX: e.clientX, mouseY: e.clientY,
      scrollLeft: el.scrollLeft, scrollTop: el.scrollTop,
    }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragStart.current || !containerRef.current) return
    containerRef.current.scrollLeft = dragStart.current.scrollLeft - (e.clientX - dragStart.current.mouseX)
    containerRef.current.scrollTop = dragStart.current.scrollTop - (e.clientY - dragStart.current.mouseY)
  }

  const handlePointerUp = () => { dragStart.current = null }

  return (
    <div
      ref={containerRef}
      className={cn("overflow-auto scrollbar-none", className)}
      style={{ cursor: zoom > 100 ? "grab" : "default" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <Document file={src}>
        <Page
          pageNumber={1}
          width={containerWidth * (zoom / 100)}
          onRenderSuccess={centerScroll}
        />
      </Document>
    </div>
  )
}
