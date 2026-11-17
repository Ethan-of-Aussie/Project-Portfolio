import type { DietProp, Consumables, NutrimentType } from "@/lib/user/dietPlan";
import { Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";
import { log } from "node:console";
import { useState } from "react";

type DietCardProp = {
  dietPlan: DietProp;
};
const sumUpNutriments = (
  consumables: Consumables[]
): NutrimentType[] => {
  const totals = consumables.reduce<Record<string, NutrimentType>>(
    (acc, consumable) => {
      consumable.nutriments?.forEach((nutrient) => {
        const { name, value } = nutrient;

        // Only use valid values
        if (value == null || !Number.isFinite(Number(value))) return;

        if (!acc[name]) {
          acc[name] = {
            ...nutrient,
            value: 0,
          };
        }

        acc[name].value += Number(value);
      });

      return acc;
    },
    {}
  );

  return Object.values(totals);
};

export default function DietPlanCard({ dietPlan }: DietCardProp) {
  const [isNutrimentExpand, setIsNutrimentExpand] = useState(false);
  return (
    <div className="grid grid-cols-5 gap-3 mb-2">
      <img src="/images/big_mike_banana.jpg" alt="" />
      <div className="col-span-4">
        <h6 className="font-bold pb-3">Plan name</h6>
        <div className="flex gap-8 mb-4">
          <h5>{dietPlan.name}</h5>
          <Button variant="contained" color="success" onClick={() => setIsNutrimentExpand((prev) => !prev)}>
            Get Nutriments
          </Button>
        </div>
        <Accordion
            className="custom-accordion mt-2"
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
            expanded = {isNutrimentExpand}
        >
          <AccordionSummary
          >
          </AccordionSummary>
            <AccordionDetails>
              {sumUpNutriments(dietPlan.consumables)
                .filter((res) => res.value !== 0)
                .map((nutriment) => (
                  <div key={nutriment.name} className="grid grid-cols-2">
                    <p>{nutriment.name}</p>

                    <div className="text-right">
                      <p>
                        {Number(nutriment.value.toFixed(2))} {nutriment.unit}
                      </p>
                    </div>
                  </div>
                ))}
            </AccordionDetails>
        </Accordion>
        <h6 className="font-bold py-3">Food List</h6>
        {dietPlan.consumables.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
