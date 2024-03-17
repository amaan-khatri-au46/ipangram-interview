import React from "react";
import {
  Button,
  Card,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import useToastify from "../../../utils/hooks/useToastify";
import { register } from "../../../store/slices/authSlice";
import { Roles } from "../../../utils/commonFunction/common";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import usePasswordVisibility from "../../../utils/hooks/usePasswordVisibility";

const validationSchema = Yup.object().shape({
  username: Yup.string().min(3).required("Username is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const showToast = useToastify();
  const {
    passwordVisible,
    passwordVisibility,
    confirmPasswordVisible,
    confirmPasswordVisibility,
  } = usePasswordVisibility();

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
            email: "",
            password: "",
            confirmPassword: "",
            role: "manager",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const res: any = await dispatch(register({ values }));
            if (res.meta.requestStatus === "fulfilled") {
              showToast("SignUp successfully!", "success");
              navigate("/Login");
            } else {
              showToast(res.error.message, "error");
            }
          }}
        >
          {({ values, touched, errors }) => (
            <Form className="px-16 py-6" style={{ backgroundColor: "#F5F5F5" }}>
              <h2
                style={{ fontSize: "26px" }}
                className="flex justify-center font-bold mb-3"
              >
                Sign Up
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
                  placeholder="Username"
                  error={!!errors.username && !!touched.username}
                  helperText={
                    errors.username && touched.username ? errors.username : " "
                  }
                />
              </div>
              <div className="mt-0">
                <label
                  htmlFor="email"
                  className={`block font-semibold text-sm ${
                    errors.email && touched.email ? "text-red-500" : ""
                  }`}
                >
                  Email
                </label>
                <Field
                  as={TextField}
                  name="email"
                  size="small"
                  fullWidth
                  id="email"
                  placeholder="Email"
                  error={!!errors.email && !!touched.email}
                  helperText={
                    errors.email && touched.email ? errors.email : " "
                  }
                />
              </div>
              <div>
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
                  placeholder="Create Password"
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
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={`block font-semibold text-sm ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  Confirm Password
                </label>
                <Field
                  as={TextField}
                  name="confirmPassword"
                  size="small"
                  fullWidth
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  error={!!errors.confirmPassword && !!touched.confirmPassword}
                  helperText={
                    errors.confirmPassword && touched.confirmPassword
                      ? errors.confirmPassword
                      : " "
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={confirmPasswordVisibility}>
                          {confirmPasswordVisible ? (
                            <VisibilityIcon style={{ fontSize: "18px" }} />
                          ) : (
                            <VisibilityOffIcon style={{ fontSize: "18px" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className={`block font-semibold text-sm ${
                    errors.role && touched.role ? "text-red-500" : ""
                  }`}
                >
                  Role
                </label>
                <Field
                  as={Select}
                  name="role"
                  type="label"
                  fullWidth
                  size="small"
                  value={values.role}
                  error={!!errors.role && !!touched.role}
                  helperText={errors.role && touched.role && errors.role}
                >
                  {Roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </div>
              <Button
                variant="contained"
                type="submit"
                style={{ marginTop: "10px" }}
                className="w-full"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
              <div className="mt-4 text-center">
                Already a User?{"  "}
                <Link to="/login" className="text-blue-500 ">
                  Login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default SignUp;
