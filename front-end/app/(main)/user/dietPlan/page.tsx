"use client";

import { api } from "@/lib/api"
import { useEffect, useState } from "react";
import DietPlanCard from '@/app/components/dietPlanCard'
import type { DietProp } from "@/lib/user/dietPlan"
import { getDietPlan } from "@/lib/user/dietPlan";
import Button from '@mui/material/Button';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';


export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}


const emails = ['username@gmail.com', 'user02@gmail.com'];

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
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disablePadding key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function dietPlan () {
    console.log("test data");
    // const getFoodData

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);
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
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{ pt: 0 }}>
                {emails.map((email) => (
                <ListItem disablePadding key={email}>
                    <ListItemButton onClick={() => handleListItemClick(email)}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={email} />
                    </ListItemButton>
                </ListItem>
                ))}
                <ListItem disablePadding>
                <ListItemButton
                    autoFocus
                    onClick={() => handleListItemClick('addAccount')}
                >
                    <ListItemAvatar>
                    <Avatar>
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account" />
                </ListItemButton>
                </ListItem>
            </List>
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