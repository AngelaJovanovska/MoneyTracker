import Box from "@mui/material/Box";
import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Expenses from "./pages/app/Expenses";
import Home from "./pages/app/Home";
import Incomes from "./pages/app/Incomes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { PrivateRoutes } from "./routes/PrivateRoutes";
import Navbar from "./components/Navbar";

export type UserT = {
    id: number;
    username: string;
};
function App() {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken")
    );
    const [user, setUser] = useState<UserT | null>(null);

    function login(accessToken: any) {
        localStorage.setItem("accessToken", accessToken);
        setAccessToken(accessToken);
    }
    function logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setAccessToken(null);
    }
    const refresh = useCallback(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
            logout();
            return;
        }
        axios
            .post(
                "http://localhost:8083/auth/refresh",
                {
                    refreshToken,
                },
                {
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                }
            )
            .then((resp) => {
                login(resp.data.accessToken);
            })
            .catch((err) => {
                console.log(err);
                logout();
            });
    }, []);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        axios
            .get("http://localhost:8083/api/users/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((userResponse) => {
                setUser(userResponse.data);
            })
            .catch((err) => {
                const error = err as AxiosError;
                console.log("auth error- you are not logged in");
                console.log(err);
                if (error.response?.status === 403) {
                    // unauthenticated - accessToken probably expired
                    refresh();
                }
            });
    }, [accessToken, refresh]);
    return (
        <Box width={"400px"} sx={{ width: { xl: "1448px" } }} m={"auto "}>
            <Navbar user={user} logout={logout} />
            <Routes>
                <Route
                    element={
                        <PrivateRoutes
                            isAllowed={Boolean(user || accessToken)}
                        />
                    }
                >
                    <Route index path="/" element={<Home user={user} />} />
                    <Route path="/incomes" element={<Incomes user={user} />} />
                    <Route
                        path="/expenses"
                        element={<Expenses user={user} />}
                    />
                </Route>
                <Route path="/login" element={<Login login={login} />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Box>
    );
}

export default App;
