"use client";

import { api } from "@/lib/api"
import { useEffect, useState } from "react";
import DietPlanCard from '@/app/components/dietPlanCard'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Consumable from "@/app/components/consumable"

import type { DietProp, ExternalConsumables, ExternalConsumable, CreateTableRequestType, ConsumableRequest } from "@/lib/user/dietPlan"
import { getDietPlan, getExternalConsumables } from "@/lib/user/dietPlan";
import { Field } from '@base-ui/react/field';
import styles from './index.module.css';
export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

const emails = ['username@gmail.com', 'user02@gmail.com'];

export function DietPlanForm() {
    const [selectedConsumables, setSelectedConsumables] = useState<ExternalConsumable[]>([])
    const [externalConsumablesData, setExternalConsumablesData] = useState<ExternalConsumables>();
    const [isGetFoodLoading, setIsGetFoodLoading] = useState<boolean>()
    const [tableName, setTableName] = useState("")

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
                } as ConsumableRequest})

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
            <div>
                {
                    selectedConsumables.map((item, index) => (
                        <div key={index}>{item.product_name[0].text}</div>
                    ))
                }
            </div>
            <div className="pb-3">
                <Button variant="contained" onClick={setExternalConsumables} loading={isGetFoodLoading}>Get all Foods</Button>
            </div>
            <div className="flex flex-wrap gap-1">
                {
                    externalConsumablesData?.consumables.map((item, index) => (
                        <Consumable key={index} addConsumableClick={addSelectedConsumables} removeConsumableClick={removeSelectedConsumables} consumable={item} />
                    ))
                }
            </div>
        <Button variant="contained" color="error" onClick={onSubmitCreateDietPlan}>Submit</Button>
        </Field.Root>
        );
}

export default function dietPlan () {
    console.log("test data");
    // const getFoodData

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(emails[1]);
    const [foodDatas, setFoodDatas] = useState([]);
    const [dietPlans, setDietPlans] = useState<DietProp[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleClickOpen = () => {
            setOpen(true);
        };
    const handleClose = (value: string) => {
            setOpen(false);
            setSelectedValue(value);
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

    function SimpleDialog(props: SimpleDialogProps) {
        const { onClose, selectedValue, open } = props;

        const handleClose = () => {
            onClose(selectedValue);
        };

        const handleListItemClick = (value: string) => {
            onClose(value);
        };

        return (
            <Dialog onClose={handleClose} open={open}>
                <div className="w-[500px] h-[800px] border-[lightseagreen] p-3">
                    <p className="font-bold text-lg py-3">Create Plan</p>
                    <DietPlanForm/>
                </div>
            </Dialog>
        );
    }
    useEffect(() => {
        setDietPlansData()
    }, [])
    return (
        <div>
            <div className="mb-3">
                <Button variant="contained" onClick={handleClickOpen}>Create Diet Plan</Button>
                <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                />
            </div>
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