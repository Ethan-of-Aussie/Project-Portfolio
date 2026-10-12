import { api } from "@/lib/api"

type Consumables = {
    name: string,
    code: string
}
type DietProp = {
    name: string,
    consumables: Consumables[]
}

const getDietPlan = async () => {
    let dietPlan = await api.get("/api/v1/plans/userplans");
    return dietPlan.data;
}

export type {
    Consumables,
    DietProp
}

export {
    getDietPlan
}