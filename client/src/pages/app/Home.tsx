import { Box } from "@mui/material";
import { UserT } from "../../App";

type Props = {
    user: UserT | null;
};

export default function Home({ user }: Props) {
    return (
        <Box>
            <p>hello {user?.username ?? "not logged in"}</p>
            <p>hello this is the user's id: {user?.id ?? "not logged in"}</p>
        </Box>
    );
}
