import { Box } from "@mui/material";

type Props = {
    user: any;
};

export default function Home({ user }: Props) {
    return (
        <Box>
            <p>hello {user.username}</p>
        </Box>
    );
}
