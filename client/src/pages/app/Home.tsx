import { Box } from "@mui/material";
import Users from "./Users";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";

type Props = {
    user: any;
};

export default function Home({ user }: Props) {
    return (
        <Box>
            <p>hello {user?.username ?? "not logged in"}</p>
        </Box>
    );
}
