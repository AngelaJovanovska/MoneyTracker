import LoginIcon from "@mui/icons-material/Login";
import { Button, Link as MUILink, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { UserT } from "../App";

const Navbar = ({
    user,
    logout,
}: {
    user: UserT | null;
    logout: () => void;
}) => {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            gap="20px"
            fontFamily="monospace"
            fontSize={{ xs: "18px", sm: "24px" }}
            display="flex"
            alignItems="center"
            justifyContent={{ xs: "center", sm: "space-between" }}
            sx={{
                mt: { xs: "10px", sm: "12px" },
                px: "20px",
                marginRight: { xs: "0", sm: "100px" },
            }}
        >
            <MUILink
                component={Link}
                to="/"
                style={{
                    textDecoration: "none",
                    color: "#000",
                    animation: "ease-in-out",
                }}
            >
                Home
            </MUILink>
            <MUILink
                component={Link}
                to="/incomes"
                style={{
                    textDecoration: "none",
                    color: "#000",
                    animation: "ease-in-out",
                }}
            >
                Incomes
            </MUILink>
            <MUILink
                component={Link}
                to="/expenses"
                style={{
                    textDecoration: "none",
                    color: "#000",
                    animation: "ease-in-out",
                }}
            >
                Expenses
            </MUILink>
            {user ? (
                <Button onClick={logout}>Logout</Button>
            ) : (
                <MUILink
                    component={Link}
                    to="/login"
                    style={{
                        textDecoration: "none",
                        color: "#000",
                        animation: "ease-in-out",
                    }}
                >
                    <LoginIcon fontSize="large" />
                </MUILink>
            )}
        </Stack>
    );
};

export default Navbar;
