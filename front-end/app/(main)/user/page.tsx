"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function user () {
    const [disPlayText, setDisplayText] = useState("Text to display");
    const getDisplayText = async () => {
        const response = await api.get("/api/v1/users/");
        const data = response.data;
        setDisplayText(data);
    }
    return (
        <div>
            <h1>{ disPlayText }</h1>
            <button className="bg-red-500" onClick={
                getDisplayText
            }>get api</button>
        </div>
    )
}