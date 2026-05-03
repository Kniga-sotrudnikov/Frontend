import { useState } from "react"

function useDialogState(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen)

  return { open, onOpenChange: setOpen}
}

export { useDialogState }
