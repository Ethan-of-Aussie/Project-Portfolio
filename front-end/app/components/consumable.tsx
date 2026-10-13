import type { DietProp, ExternalConsumables, ExternalConsumable } from "@/lib/user/dietPlan"
import { useState } from "react"

type ConsumableProp = {
    consumable: ExternalConsumable,
    addConsumableClick: (consumable: ExternalConsumable) => void
    removeConsumableClick: (consumable: ExternalConsumable) => void
}

export default function Consumable ({consumable, addConsumableClick, removeConsumableClick}: ConsumableProp) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <button
            onClick={() => {
                    if (!isSelected) {
                        addConsumableClick(consumable)
                    } else {
                        removeConsumableClick(consumable)
                    }
                    setIsSelected(!isSelected)
                }
            }
            className={`${isSelected ? "bg-[lightseagreen]": "bg-gray-400"} !text-white rounded-full px-6 py-1 text-xs`}>
            {consumable.product_name[0].text}
        </button>
    )
}