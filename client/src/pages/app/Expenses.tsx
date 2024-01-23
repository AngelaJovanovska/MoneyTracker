import React, { Fragment, useEffect, useState } from "react";
import DataTable from "./DataTable";

type Props = {
    user: any;
};
interface ExpensesProps {
    id: number;
    amount: number;
    created_at: string;
    description: string;
    type: string;
}

export default function Expenses({ user }: Props) {
    const [expenses, setExpenses] = useState<ExpensesProps[]>([]);

    useEffect(() => {
        const getExpenses = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch(
                    "http://localhost:8083/api/expenses",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setExpenses(data);
            } catch (err) {
                console.error("Error catching data ", err);
            }
        };
        getExpenses();
    }, []);
    console.log(expenses);
    return (
        <Fragment>
            {/* <table className="table">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Created at</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td>{expense.amount}</td>
                            <td>{expense.created_at}</td>
                            <td>{expense.description}</td>
                            <td>{expense.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <DataTable data={expenses} />
        </Fragment>
    );
}
