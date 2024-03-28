import { Navigate, Outlet } from "react-router-dom";
import { getUserDetails } from "../commonFunction/common";

const ProtectedRoute = () => {
  return getUserDetails() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
