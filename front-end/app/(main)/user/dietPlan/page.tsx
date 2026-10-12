"use client";

import { api } from "@/lib/api"
import { useEffect, useState } from "react";
import DietPlanCard from '@/app/components/dietPlanCard'
import type { DietProp } from "@/lib/user/dietPlan"
import { getDietPlan } from "@/lib/user/dietPlan";

export default function dietPlan () {
    console.log("test data");
    // const getFoodData
    const [foodDatas, setFoodDatas] = useState([]);
    const [dietPlans, setDietPlans] = useState<DietProp[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const setDietPlansData = async () => {
        let data = (await getDietPlan());
        console.log("hhhhaaa", data);
        
        setDietPlans(data)
    }
    const get_res = async () => {
        setIsLoading(true);
        return await api.get("/api/v1/consumables/sciencedata").then((res) => res.data).then((data) => {
            console.log(data);
            setFoodDatas(data.consumables);
            console.log(foodDatas);
            setIsLoading(false)
        })
                .catch((err) => console.error("Failed:", err));
    }
    useEffect(() => {
        setDietPlansData()
    }, [])
    return (
        <div>
            <div className="flex flex-col gap-3">
                {
                    dietPlans.map((plan, index) => (
                        <DietPlanCard dietPlan= {plan} key={index}></DietPlanCard>
                    ))
                }
            </div>
            <h1 onClick={get_res}>Get consumables</h1>
            {
                isLoading && <h1 className="text-green-600">Is Loading ...</h1>
            }
            <div className="grid gap-3 grid-cols-3">
                {
                    foodDatas.map((data, index) => (
                        <button key={index} className="p-4 bg-blue-300 rounded-full">
                            {!data["product_name"] ? "No name found" : data["product_name"][0]["text"] }
                        </button>
                    ))
                }
            </div>
        </div>
    )
}