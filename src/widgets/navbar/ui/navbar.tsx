import { useState } from "react"
import type { OrgUnit } from "./navbar-types"
import RenderUnits from "./render-unit"

type NavbarProps = { unitsList: OrgUnit[] }

function Navbar({ unitsList }: NavbarProps) {
    const [selectedName, setSelectedName] = useState<string | null>(null)
    return (
        <div className="h-full w-73.75 bg-white p-2.5 rounded-t-2xl border-t border-l border-r border-border">
            <h4 className="mx-2.5 mt-2.5">Навигация</h4>
            {unitsList.map((unit) => 
              <RenderUnits 
                unit={unit} 
                selectedName={selectedName} 
                onSelect={setSelectedName} 
                key={unit.name}
              />
            )}
        </div>
    )
}

export default Navbar