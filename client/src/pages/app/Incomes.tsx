import React, { Fragment, useEffect, useState } from "react";
import DataTable from "./DataTable";
// import api from "../../api";
import axios from "axios";

import { AxiosError } from "axios";

type Props = {
    user: any;
};
interface IncomesProps {
    id: number;
    amount: number;
    created_at: string;
    description: string;
    type: string;
}

export default function Incomes({ user }: Props) {
    const [incomes, setIncomes] = useState<IncomesProps[]>([]);

    useEffect(() => {
        const getIncomes = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await fetch(
                    "http://localhost:8083/api/incomes",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                setIncomes(data);
            } catch (error) {
                console.log("errrir cathcing data", error);
            }
        };
        getIncomes();
    }, []);
    console.log(incomes);
    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Created at</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {incomes.map((income) => (
                        <tr key={income.id}>
                            <td>{income.amount}</td>
                            <td>{income.created_at}</td>
                            <td>{income.description}</td>
                            <td>{income.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DataTable data={incomes} />
        </Fragment>
    );
}
