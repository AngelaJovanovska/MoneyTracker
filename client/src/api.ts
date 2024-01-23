import axios from "axios";
import { error } from "console";

const api = axios.create({
    baseURL: "",
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await axios.post("/auth/refresh", {
                    refreshToken,
                });
                const { token } = response.data;

                localStorage.setItem("accessToken", token);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (error) {
                // Handle refresh token error or redirect to login
                console.log("errrorrr in the api code");
            }
        }

        return Promise.reject(error);
    }
);
export default api;
