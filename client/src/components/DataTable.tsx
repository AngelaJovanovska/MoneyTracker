import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { FC } from "react";

interface Row {
    id: number;
    amount: number;
    created_at: string;
    description: string;
    type: string;
}

interface DataTableProps {
    data: Row[];
}

const DataTable: FC<DataTableProps> = ({ data }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Amount</TableCell>
                        <TableCell>Created at</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.amount}</TableCell>
                            <TableCell>{row.created_at}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
