import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button
} from "@mui/material";
import type { ExternalConsumable } from "@/lib/user/dietPlan"
import NutrientCard from "../(main)/user/dietPlan/components/nutrientCard";

type ConsumableProp = {
    consumable: ExternalConsumable,
    addConsumableClick: (consumable: ExternalConsumable) => void
    removeConsumableClick: (consumable: ExternalConsumable) => void
    animateRemovalClick: (
        item: ExternalConsumable,
        removeItem: (item: ExternalConsumable) => void
    ) => void
    isSelected: boolean
}

export default function Consumable({ consumable, addConsumableClick, removeConsumableClick, animateRemovalClick, isSelected }: ConsumableProp) {

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
            <div className="flex items-center pr-3">
                <div className="flex-1">
                    <AccordionSummary>
                        {consumable.product_name[0].text}
                    </AccordionSummary>
                </div>
                <Button
                    variant="contained"
                    color={isSelected ? "error" : "success"}
                    size="small"
                    onClick={(event) => {
                        event.stopPropagation();
                        if (!isSelected) {
                            addConsumableClick(consumable)
                        } else {
                            animateRemovalClick(consumable, removeConsumableClick)
                        }
                    }}
                >
                    {isSelected ? "Remove" : "Add"}
                </Button>
            </div>
            <AccordionDetails>
                <NutrientCard item={consumable} />
            </AccordionDetails>
        </Accordion>
    )
}