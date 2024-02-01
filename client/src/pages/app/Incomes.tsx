import { Fragment, useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import { UserT } from "../../App";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

type Props = {
    user: UserT | null;
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
    const axiosPrivate = useAxiosPrivate();
    let navigate = useNavigate();

    useEffect(() => {
        const getIncomes = async () => {
            try {
                const response = await axiosPrivate.get("/incomes");
                console.log(response.data);
                console.log("pomina");
                setIncomes(response.data);
            } catch (error) {
                console.log("errrir cathcing data", error);
                navigate("/login");
            }
        };

        getIncomes();
    }, [axiosPrivate, navigate]);

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
            <p>
                hello this are {user?.username ?? "not logged in"} created
                expenses!
            </p>
            <DataTable data={incomes} />
        </Fragment>
    );
}
