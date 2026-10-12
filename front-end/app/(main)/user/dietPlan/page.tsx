"use client";

import { api } from "@/lib/api"

export default function dietPlan () {
    console.log("test data");
    // const getFoodData
    const get_res = async () => {
        return await api.get("/api/v1/consumables/sciencedata").then((res) => console.log("Success:", res.data))
                .catch((err) => console.error("Failed:", err));
    }
    return (
        <h1 onClick={get_res}>Diet plan</h1>
    )
}