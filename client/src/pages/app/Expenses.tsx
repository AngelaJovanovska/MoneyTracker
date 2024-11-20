import { Fragment, useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { UserT } from "../../App";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

type Props = {
    user: UserT | null;
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
    const axiosPrivate = useAxiosPrivate();
    let navigate = useNavigate();
    useEffect(() => {
        const getExpenses = async () => {
            try {
                const response = await axiosPrivate.get("/expenses");
                console.log(response.data);
                console.log("pomina");
                setExpenses(response.data);
            } catch (error) {
                console.error("Error catching data ", error);
                navigate("/login");
            }
        };
        getExpenses();
    }, [axiosPrivate, navigate]);
    console.log(expenses);
    return (
        <Fragment>
            <p>
                hello this are {user?.username ?? "not logged in"} created
                expenses!
            </p>
            {/* <DataTable data={expenses} /> */}
        </Fragment>
    );
}
