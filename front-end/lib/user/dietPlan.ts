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
    "100g": null | Number,
    name: string,
    prepared_100g: null | number,
    prepared_serving: null | number,
    prepared_unit:null | number,
    prepared_value:null | number,
    serving: number,
    unit: string,
    value: number
}
type ProductName = {
    lang: string,
    text: string
}
type ExternalConsumable = {
    code: string,
    ingredients: string,
    ingredients_text: {
        lang: string,
        text: string,
    }[]
    nutriments: NutrimentType[],
    product_name: ProductName[]
}

type ExternalConsumables = {
    consumables: ExternalConsumable[]
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
    ExternalConsumables
}

export {
    getDietPlan,
    getExternalConsumables
}