import { FunctionComponent } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes: FunctionComponent<{
    isAllowed: boolean;
}> = ({ isAllowed }) => {
    if (!isAllowed) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};
