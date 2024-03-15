import React, { useState } from "react";
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

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string().min(6).max(50).required("Please enter your password"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const showToast = useToastify();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "30%" }}>
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
                  payload: res.payload,
                })
              );
              showToast("Login successful!", "success");
              navigate("/");
            } else {
              showToast("Please Enter Correct Password Or User Name", "danger");
            }
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="px-16 py-14">
              <h2
                style={{ fontSize: "26px" }}
                className="flex justify-center font-bold mb-8"
              >
                Login
              </h2>
              <div>
                <label htmlFor="username" className="block font-semibold">
                  User Name *
                </label>
                <Field
                  as={TextField}
                  name="username"
                  size="small"
                  fullWidth
                  id="username"
                  sx={{ width: "100%" }}
                  placeholder="Enter your username"
                  error={!!errors.username && !!touched.username}
                  helperText={
                    errors.username && touched.username ? errors.username : " "
                  }
                  className={`border-gray-300 focus:border-blue-500 ${
                    errors.username && touched.username ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="password" className="block font-semibold">
                  Password *
                </label>
                <Field
                  as={TextField}
                  name="password"
                  size="small"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  error={!!errors.password && !!touched.password}
                  helperText={
                    errors.password && touched.password ? errors.password : " "
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? (
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
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="mt-6 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500">
                  Register here
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
