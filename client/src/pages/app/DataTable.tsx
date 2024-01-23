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
import EditButton from "./EditButton";

interface Row {
    id: number;
    amount: number;
    created_at: string;
    description: string;
    type: string;
}

// Define the props type for your DataTable component
interface DataTableProps {
    data: Row[];
}

// DataTable component
const DataTable: React.FC<DataTableProps> = ({ data }) => {
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
                        {/* Add more cells for each column */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.amount}</TableCell>
                            <TableCell>{row.created_at}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>
                                <EditButton />

                                <Button
                                    variant="contained"
                                    className="delete-btn"
                                    color="error"
                                >
                                    Delete
                                </Button>
                            </TableCell>
                            {/* Render cells for each column */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DataTable;
