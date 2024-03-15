import React, { useState } from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import useToastify from "../../../utils/hooks/useToastify";
import { register } from "../../../store/slices/authSlice";
import { Roles } from "../../../utils/commonFunction/common";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please enter your username"),
  email: Yup.string()
    .email("enter valid email")
    .required("Please enter your Email"),
  role: Yup.string().required(),
  password: Yup.string().min(6).max(50).required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please enter confirm password"),
});

const Register = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const showToast = useToastify();

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "30%" }}>
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
              showToast("User registered successfully", "success");
              navigate("/Login");
            } else {
              showToast("Username or Email already Exist", "danger");
            }
          }}
        >
          {({ values, touched, errors, isSubmitting }) => (
            <Form className="px-16 py-14">
              <h2
                style={{ fontSize: "26px" }}
                className="flex justify-center font-bold mb-8"
              >
                Sign Up
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
                  placeholder="Username"
                  error={!!errors.username && !!touched.username}
                  helperText={
                    errors.username && touched.username ? errors.username : " "
                  }
                  className={`border-gray-300 focus:border-blue-500 ${
                    errors.username && touched.username ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="mt-0">
                <label htmlFor="username" className="block font-semibold">
                  Email *
                </label>
                <Field
                  as={TextField}
                  name="email"
                  size="small"
                  fullWidth
                  id="email"
                  sx={{ width: "100%" }}
                  placeholder="Email"
                  error={!!errors.email && !!touched.email}
                  helperText={
                    errors.email && touched.email ? errors.email : " "
                  }
                  className={`border-gray-300 focus:border-blue-500 ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div>
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
                  placeholder="Password"
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
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block font-semibold"
                >
                  Confirm Password *
                </label>
                <Field
                  as={TextField}
                  name="confirmPassword"
                  size="small"
                  fullWidth
                  type={confirmPassword ? "text" : "password"}
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
                        <IconButton
                          onClick={() => setConfirmPassword((prev) => !prev)}
                          onMouseDown={(event) => event.preventDefault()}
                          edge="end"
                        >
                          {confirmPassword ? (
                            <VisibilityIcon style={{ fontSize: "18px" }} />
                          ) : (
                            <VisibilityOffIcon style={{ fontSize: "18px" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  className={`border-gray-300 focus:border-blue-500 ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block font-semibold"
                >
                  role *
                </label>
                <Field
                  as={Select}
                  name="role"
                  fullWidth
                  size="small"
                  value={values.role}
                  error={!!errors.role && !!touched.role}
                  helperText={errors.role && touched.role && errors.role}
                  style={{ marginTop: "8px" }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
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
                {loading ? "Signup..." : "Signup"}
              </Button>
              <div className="mt-4 text-center">
                Already a User?{" "}
                <Link to="/login" className="text-blue-500 ">
                  Login here
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Register;
