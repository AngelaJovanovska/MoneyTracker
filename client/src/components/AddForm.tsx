import * as React from "react";

import {
    FormControl,
    FormLabel,
    Button,
    TextField,
    NativeSelect,
} from "@mui/material";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface Form {
    amount: number;
    // created_at: string;
    description: string;
    type: string;
}
interface IncomeFormProps {
    onAddIncome: (newIncome: {
        // id: number;
        amount: number;
        created_at?: string;
        description: string;
        type: string;
    }) => void;
}

export default function AddForm({ onAddIncome }: IncomeFormProps) {
    const [inputState, setInputState] = useState<Form>({
        amount: 6,
        // created_at: "",
        description: "",
        type: "",
    });
    const axiosPrivate = useAxiosPrivate();

    const handleInput =
        (name: keyof Form) =>
        (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
            const value = e.target.value as string; // Cast the value to string
            setInputState({
                ...inputState,
                [name]:
                    name === "amount"
                        ? Number(value)
                        : name === "type"
                        ? value // Set the value directly for 'type'
                        : value,
            });
        };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const currentDate = new Date().toISOString(); // Get current date in ISO format
            const newState = { ...inputState, created_at: currentDate }; // Include the current date in the state
            const response = await axiosPrivate.post(
                "http://localhost:8083/api/incomes",
                JSON.stringify(newState),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            onAddIncome(newState); // Update the local state with the new income
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FormControl>
            <form onSubmit={handleSubmit}>
                <div className="input-control">
                    <TextField
                        label="Amount"
                        value={inputState.amount}
                        type="text"
                        name="amount"
                        onChange={handleInput("amount")}
                    />
                </div>
                <div className="input-control">
                    <TextField
                        label="Description"
                        value={inputState.description}
                        type="text"
                        name="description"
                        onChange={handleInput("description")}
                    />
                </div>
                <div className="input-control">
                    <FormLabel>Type</FormLabel>
                    <NativeSelect
                        value={inputState.type}
                        onChange={handleInput("type")}
                    >
                        <option value="earned">Earned</option>
                        <option value="passive">Passive</option>
                        <option value="portfolio">Portfolio</option>
                    </NativeSelect>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </FormControl>
    );
}
