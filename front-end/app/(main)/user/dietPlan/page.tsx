"use client";

import { api } from "@/lib/api"
import { useState } from "react";

export default function dietPlan () {
    console.log("test data");
    // const getFoodData
    const [foodDatas, setFoodDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
    return (
        <div>
            <h1 onClick={get_res}>Get consumables</h1>
            {
                isLoading && <h1 className="text-green-600">Is Loading ...</h1>
            }
            <div className="grid gap-3 grid-cols-3">
                {
                    foodDatas.map((data, index) => (
                        <button key={index} className="p-4 bg-blue-300 rounded-full">
                            {!data["categories"] ? "Not categorize" : data["categories"] }
                        </button>
                    ))
                }
            </div>
        </div>
    )
}