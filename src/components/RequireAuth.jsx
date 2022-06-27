import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../context/useAuth";
import { useLocation } from "react-router-dom";

const RequireAuth = () => {
    const { auth } = useAuth();
    const { pathname } = useLocation();
    return auth?._id && pathname != "/Confirmation" ? (
        <Outlet />
    ) : pathname == "/order" ? (
        <Navigate to="/login" replace state={"/Order"} />
    ) : (
        <Navigate to="/" replace />
    );
    // auth?._id ?
    //     <Outlet />
    //     {console.log(pathname)}
    //     <Navigate to="/login" replace state={"/Order"} />
};

export default RequireAuth;
