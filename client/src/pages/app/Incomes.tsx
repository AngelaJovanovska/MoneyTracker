import { Fragment, useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { UserT } from "../../App";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import AddForm from "../../components/AddForm";

type Props = {
    user: UserT | null;
};
export interface IncomesProps {
    // id?: number;
    amount: number;
    created_at?: string;
    description: string;
    type: string;
}

export default function Incomes({ user }: Props) {
    const [incomes, setIncomes] = useState<IncomesProps[]>([]);
    const axiosPrivate = useAxiosPrivate();
    let navigate = useNavigate();
    const addIncome = (newIncome: IncomesProps) => {
        setIncomes([...incomes, newIncome]);
    };

    useEffect(() => {
        const getIncomes = async () => {
            try {
                const response = await axiosPrivate.get("/incomes");
                console.log(response.data);
                console.log("pomina-momentalno incomes.tsx");
                setIncomes(response.data);
            } catch (error) {
                console.log("error catching data", error);
                navigate("/login");
            }
        };

        getIncomes();
    }, [axiosPrivate, navigate]);

    // console.log(incomes);
    return (
        <Fragment>
            <p>
                Hi this incomes are created by the user:{" "}
                {user?.username ?? "not logged in"}!
            </p>
            <AddForm onAddIncome={addIncome} />
            <DataTable data={incomes} />
        </Fragment>
    );
}
