import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";

interface Row {
    id?: number;
    amount: number;
    created_at?: string;
    description: string;
    type: string;
}

interface DataTableProps {
    data: Row[];
}

export default function DataTable({ data }: DataTableProps) {
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
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.amount}</TableCell>
                            <TableCell>{row.created_at}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
