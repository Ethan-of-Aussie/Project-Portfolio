import { api } from "@/lib/api"

type Consumables = {
    name: string,
    code: string
}
type DietProp = {
    name: string,
    consumables: Consumables[]
}

type NutrimentType = {
    name: string | null,
    value: number | null,
    value_100g: number | null,
    serving: number | null,
    unit: string | null,
    prepared_value: number | null,
    prepared_100g: number | null,
    prepared_serving: number | null,
    prepared_unit: string | null,
}
type ProductName = {
    lang: string,
    text: string
}
type ExternalConsumable = {
    code: string,
    /* ingredients: string,
     ingredients_text: {
         lang: string,
         text: string,
     }[] */
    nutriments: NutrimentType[],
    product: string
}

type ExternalConsumables = {
    consumables: ExternalConsumable[]
}
type nutrientsRequest = {
    additionalProp1: number,
    additionalProp2: number,
    additionalProp3: number
}
type ConsumableRequest = {
    product: string,
    code: string,
    nutriments: NutrimentType[],
   /* weight: number,
    quantity: number, */
    allergies: string[]
}
type CreateTableRequestType = {
    name: string,
    consumables: ConsumableRequest[]

}
const getDietPlan = async () => {
    let dietPlan = await api.get("/api/v1/plans/userplans");
    return dietPlan.data;
}

const getExternalConsumables = async () => {
    const externalConsumables = await api.get("/api/v1/consumables/sciencedata");
    return externalConsumables.data;
}

export type {
    Consumables,
    DietProp,
    ExternalConsumable,
    ExternalConsumables,
    ConsumableRequest,
    CreateTableRequestType
}

export {
    getDietPlan,
    getExternalConsumables
}