import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import useToastify from "../../../utils/hooks/useToastify";
import { login } from "../../../store/slices/authSlice";
import usePasswordVisibility from "../../../utils/hooks/usePasswordVisibility";

const validationSchema = Yup.object().shape({
  username: Yup.string().min(3).required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const showToast = useToastify();
  const { passwordVisible, passwordVisibility } = usePasswordVisibility();

  return (
    <div
      className="flex justify-center items-center h-[100vh]"
      style={{
        backgroundImage: `url("/img/bgimg/bgimg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card style={{ width: "28%" }}>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const res: any = await dispatch(login({ values }));
            if (res.meta.requestStatus === "fulfilled") {
              localStorage.setItem(
                "userDetails",
                JSON.stringify({
                  payload: res.payload.data,
                })
              );
              showToast("Login successful!", "success");
              navigate("/");
            } else {
              showToast(res.error.message, "error");
            }
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form
              className="px-16 py-10"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <h2
                style={{ fontSize: "26px" }}
                className="flex justify-center font-bold mb-8"
              >
                Login
              </h2>
              <div>
                <label
                  htmlFor="username"
                  className={`block font-semibold text-sm ${
                    errors.username && touched.username ? "text-red-500" : ""
                  }`}
                >
                  User Name
                </label>
                <Field
                  as={TextField}
                  name="username"
                  size="small"
                  fullWidth
                  id="username"
                  sx={{ width: "100%" }}
                  placeholder="Username"
                  error={!!errors.username && !!touched.username}
                  helperText={
                    errors.username && touched.username ? errors.username : " "
                  }
                  className={`border-gray-300 focus:border-blue-500  ${
                    errors.username && touched.username ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="password"
                  className={`block font-semibold text-sm ${
                    errors.password && touched.password ? "text-red-500" : ""
                  }`}
                >
                  Password
                </label>
                <Field
                  as={TextField}
                  name="password"
                  size="small"
                  fullWidth
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  error={!!errors.password && !!touched.password}
                  helperText={
                    errors.password && touched.password ? errors.password : " "
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={passwordVisibility}>
                          {passwordVisible ? (
                            <VisibilityIcon style={{ fontSize: "18px" }} />
                          ) : (
                            <VisibilityOffIcon style={{ fontSize: "18px" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  className={`border-gray-300 focus:border-blue-500 ${
                    errors.password && touched.password ? "border-red-500" : ""
                  }`}
                />
              </div>
              <Button
                variant="contained"
                type="submit"
                style={{ marginTop: "30px" }}
                className="mt-2 w-full"
              >
                {loading ? "Loging..." : "Login"}
              </Button>
              <div className="mt-6 text-center">
                Don't have an account?{"  "}
                <Link to="/signup" className="text-blue-500">
                  Signup
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
