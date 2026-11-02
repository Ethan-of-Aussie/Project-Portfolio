import type { DietProp } from "@/lib/user/dietPlan"

type DietCardProp = {
    dietPlan: DietProp
}

export default function DietPlanCard ({ dietPlan }: DietCardProp) {
    return (
        <div className="grid grid-cols-5 gap-3">
            <div className="col-span-1 bg-gray-300 aspect-square">

            </div>
            <div className="col-span-4">
                <h6 className="font-bold pb-3">Plan name</h6>
                <h5>{ dietPlan.name }</h5>
                <h6 className="font-bold py-3">Food List</h6>
                {
                    dietPlan.consumables.map((item, index) => (
                        <div key={index}>{item.name}</div>
                    ))
                }
            </div>
        </div>
    )
}