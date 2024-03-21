import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../commonFunction/common";

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
