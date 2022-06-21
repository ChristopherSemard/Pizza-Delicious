
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    return (
        auth?._id
        ? <Outlet />
        : <Navigate to="/login" replace />
    );
}

export default RequireAuth