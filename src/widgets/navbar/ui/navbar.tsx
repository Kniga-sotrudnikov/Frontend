import type { OrgUnit } from "./navbar-types"
import renderUnits from "./render-item"

function Navbar({ unitsList }: { unitsList: OrgUnit[] }) {
    return (
        <div className="w-[295px] bg-white p-5 rounded-2xl border-t border-l border-r border-border fixed bottom-5">
            {unitsList.map((unit) => renderUnits(unit))}
        </div>
    )
}

export default Navbar