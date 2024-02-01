import axios from "../api/axios";

const useRefreshToken = () => {
    const refresh = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                throw new Error("Refresh token not found");
            }
            const response = await axios.post(
                "http://localhost:8083/auth/refresh",
                {
                    refreshToken,
                }
            );
            const newAccessToken = response.data.accessToken;
            console.log(response.data);
            console.log(newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error("error refreshing token", error);
        }
    };
    return refresh;
};

export default useRefreshToken;
