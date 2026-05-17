import { useState, useEffect } from "react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { incZoom, decZoom } from "./zoom-utils"

interface ZoomControlProps {
  value: number;
  onChange: (value: number) => void
}

function ZoomControl({ value, onChange }: ZoomControlProps) {
  const [inputValue, setInputValue] = useState(`${value}%`)

  useEffect(() => {
    setInputValue(`${value}%`)
  }, [value])

  const commit = () => {
    const parsed = parseInt(inputValue, 10)
    if (isNaN(parsed) || parsed === value ) {
      setInputValue(`${value}%`)
    } else {
      onChange(Math.max(100, parsed))
    }
  }

  return (
    <div className="flex items-center">
      <Button variant="outline" size="icon" className="border-border" onClick={() => onChange(decZoom(value, 10))}>−</Button>
      <Input
        wrapperClassName="border-0 focus-within:ring-0"
        className="w-9 text-center"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
      />
      <Button variant="outline" size="icon" className="border-border" onClick={() => onChange(incZoom(value, 10))}>+</Button>
    </div>
  )
}

export { ZoomControl }
