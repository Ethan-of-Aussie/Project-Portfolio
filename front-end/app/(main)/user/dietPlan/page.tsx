"use client";

import { api } from "@/lib/api"
import { useEffect, useState } from "react";
import DietPlanCard from '@/app/components/dietPlanCard'
import Button from '@mui/material/Button';
import Consumable from "@/app/components/consumable"

import type { DietProp, ExternalConsumables, ExternalConsumable, CreateTableRequestType, ConsumableRequest } from "@/lib/user/dietPlan"
import { getDietPlan, getExternalConsumables } from "@/lib/user/dietPlan";
import { Field } from '@base-ui/react/field';
import useAnimatedRemoval from "@/hooks/useAnimatedRemoval";
import styles from './index.module.css';

export function DietPlanForm() {
    const [selectedConsumables, setSelectedConsumables] = useState<ExternalConsumable[]>([])
    const { removingCodes, animateRemoval } = useAnimatedRemoval();
    const [currentPage, setCurrentPage] = useState(1);
    const [externalConsumablesData, setExternalConsumablesData] = useState<ExternalConsumables>();
    const [isGetFoodLoading, setIsGetFoodLoading] = useState<boolean>()
    const [tableName, setTableName] = useState("")

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = externalConsumablesData?.consumables.slice(
        startIndex,
        endIndex
    );
    const totalPages = Math.ceil(
        (externalConsumablesData?.consumables.length ?? 0) / itemsPerPage
    )

    const onSubmitCreateDietPlan = async () => {
        console.log("summited");
        let createTableRequest: CreateTableRequestType = {} as CreateTableRequestType;
        createTableRequest.name = tableName;
        createTableRequest.consumables = selectedConsumables.map((item) => {
            return {
                name: item.product_name[0].text,
                code: Number(item.code),
                allergies: [],
                nutrients: {},
                quantity: 0,
                weight: 0
            } as ConsumableRequest
        })

        const response = await api.post("/api/v1/plans/create", createTableRequest);
        console.log("is respond back", response);

    }
    const addSelectedConsumables = (consumable: ExternalConsumable) => {
        setSelectedConsumables((prev) => [...prev, consumable])
    }
    const removeSelectedConsumables = (Consumable: ExternalConsumable) => {
        setSelectedConsumables((prev) => prev.filter((item) => item.code !== Consumable.code))
    }
    const setExternalConsumables = async () => {
        setIsGetFoodLoading(true)
        const respond = await getExternalConsumables() as ExternalConsumables;
        console.log(respond)
        setExternalConsumablesData(respond)
        setIsGetFoodLoading(false)
    }
    return (
        <Field.Root className={`${styles.Field} !max-w-[None]`}>
            <Field.Label className={styles.Label}>Name</Field.Label>
            <Field.Control
                required
                placeholder="Required"
                className={styles.Input}
                value={tableName}
                onChange={(e) => {
                    setTableName(e.target.value);
                }}
            />

            <Field.Error className={styles.Error} match="valueMissing">
                Please enter your name
            </Field.Error>
            <Field.Label className={styles.Label}>Foods and Drinks</Field.Label>

            <Field.Error className={styles.Error} match="valueMissing">
                pick your favorite
            </Field.Error>
            <div className="flex flex-wrap gap-2 pb-3">
                {
                    selectedConsumables.map((item, index) => (
                        <div key={index}
                            className={`flex items-center gap-2 rounded-full bg-green-700 text-white px-4 py-2 ${removingCodes.includes(item.code) ? "chip-exit" : "chip-enter"}`}
                        >
                            <span>{item.product_name[0].text}</span>
                            <button
                                type="button"
                                onClick={() => animateRemoval(item, removeSelectedConsumables)}
                                className="flex h-6 w-6 items-center justify-center rounded-full font-bold text-[#d32f2f]"
                                aria-label={`Remove ${item.product_name[0].text}`}
                            >
                                X
                            </button>
                        </div>
                    ))
                }
            </div>
            <div className="pb-3 ">
                <Button variant="contained" color="success" onClick={setExternalConsumables} loading={isGetFoodLoading}>Get all Foods</Button>
            </div>
            <div className="flex flex-col gap-3 pb-3">
                {
                    currentItems?.map((item, index) => (
                        <Consumable
                            key={index}
                            addConsumableClick={addSelectedConsumables}
                            removeConsumableClick={removeSelectedConsumables}
                            consumable={item}
                            isSelected={selectedConsumables.some(
                                (selectedItem) => selectedItem.code === item.code
                            )}
                            animateRemovalClick={animateRemoval}
                        />
                    ))
                }
            </div>
            {
                externalConsumablesData?.consumables.length > 0 && (
                    <>
                        <div className="flex flex-wrap gap-2">
                            <Button variant="contained" color="success" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
                            <Button variant="contained" color="success" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
                        </div>
                        <p className="py-3">Page {currentPage} of {totalPages}</p>
                    </>
                )
            }
            <Button variant="contained" color="success" onClick={onSubmitCreateDietPlan}>Submit</Button>
        </Field.Root >
    );
}

export default function dietPlan() {
    const [showFoodBrowser, setShowFoodBrowser] = useState(false);
    const [foodDatas, setFoodDatas] = useState([]);
    const [dietPlans, setDietPlans] = useState<DietProp[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleClickOpen = () => {
        setShowFoodBrowser(true);
    };

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
            <div className="my-3">
                <Button variant="contained" color="success" onClick={handleClickOpen}>Create Diet Plan</Button>
            </div>
            {showFoodBrowser && (
                <div className="mt-6 rounded-xl border border-gray-200 p-4 chip-enter">
                    <h2 className="text-xl font-bold">
                        Select Food
                    </h2>
                    <DietPlanForm />
                </div>
            )}
            <div className="flex flex-col gap-3">
                {
                    dietPlans.map((plan, index) => (
                        <DietPlanCard dietPlan={plan} key={index}></DietPlanCard>
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
                            {!data["product_name"] ? "No name found" : data["product_name"][0]["text"]}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}