import { Navigate, Outlet } from "react-router-dom";
import { getUserDetails } from "../commonFunction/common";

const PermissionRoute = () => {
  return getUserDetails().payload.role === "manager" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PermissionRoute;
