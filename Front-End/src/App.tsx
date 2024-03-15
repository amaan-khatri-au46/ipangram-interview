import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./views/pages/Register";
import { Provider } from "react-redux";
import store from "./store/store";
import AccessDenied from "./views/pages/AccessDenied";
import Login from "./views/pages/Login";
import EmployeeListPage from "./views/pages/EmployeeListPage";
import Department from "./views/pages/Department/Department";
import PermissionRoute from "./utils/PermissionRoute";
import EmployeeDetailsPage from "./views/pages/EmployeeDetailsPage";
import ProtectedRoute from "./utils/auth";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<EmployeeListPage />} />
            <Route path="/" element={<PermissionRoute />}>
              <Route
                path="/employee-directory"
                element={<EmployeeDetailsPage />}
              />
              <Route path="/department-management" element={<Department />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<AccessDenied />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
