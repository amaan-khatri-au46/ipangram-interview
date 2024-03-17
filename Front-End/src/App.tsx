import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import AccessDenied from "./views/pages/AccessDenied";
import Login from "./views/pages/Login";
import Department from "./views/pages/Department/Department";
import PermissionRoute from "./utils/PermissionRoute";

import ProtectedRoute from "./utils/auth";
import SignUp from "./views/pages/Register";
import EmployeeDetailsPage from "./views/pages/EmployeeDetailsPage";
import EmployeeDirectoryPage from "./views/pages/EmployeeDirectoryPage";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<EmployeeDetailsPage />} />
            <Route path="/" element={<PermissionRoute />}>
              <Route
                path="/employee-directory"
                element={<EmployeeDirectoryPage />}
              />
              <Route path="/department-management" element={<Department />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<AccessDenied />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
