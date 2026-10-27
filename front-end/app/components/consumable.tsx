import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button
} from "@mui/material";
import type { DietProp, ExternalConsumables, ExternalConsumable } from "@/lib/user/dietPlan"
import { useState } from "react"
import NutrientCard from "../(main)/user/dietPlan/components/nutrientCard";

type ConsumableProp = {
    consumable: ExternalConsumable,
    addConsumableClick: (consumable: ExternalConsumable) => void
    removeConsumableClick: (consumable: ExternalConsumable) => void
}

export default function Consumable({ consumable, addConsumableClick, removeConsumableClick }: ConsumableProp) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <Accordion
            sx={{
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "none",
                "&:before": {
                    display: "none",
                },
                "&.Mui-expanded": {
                    margin: 0,
                },
            }}
        >
            <AccordionSummary>
                <span className="flex-1">{consumable.product_name[0].text}</span>
                <Button
                    variant="contained"
                    size="small"
                    onClick={(event) => {
                        event.stopPropagation();
                        if (!isSelected) {
                            addConsumableClick(consumable)
                        } else {
                            removeConsumableClick(consumable)
                        }
                        setIsSelected(!isSelected)
                    }}
                >
                    {isSelected ? "Deselect" : "Select"}
                </Button>
            </AccordionSummary>
            <AccordionDetails>
                <NutrientCard item={consumable} />
            </AccordionDetails>
        </Accordion>
        // <button
        //     className={`${isSelected ? "bg-[lightseagreen]": "bg-gray-400"} !text-white rounded-full px-6 py-1 text-xs`}>
        //     {consumable.product_name[0].text}
        // </button>
    )
}