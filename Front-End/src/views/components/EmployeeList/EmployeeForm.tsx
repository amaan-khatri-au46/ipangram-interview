import { Button, Drawer, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  createEmployee,
  editEmployee,
  fetchEmployee,
  setDrawer,
  setFilterLocation,
  setFilterName,
} from "../../../store/slices/employeeSlice";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useToastify from "../../../utils/hooks/useToastify";
import { getUserDetails } from "../../../utils/commonFunction/common";

const EmployeeForm = () => {
  const { openDrawer, editRow, loading, filterLocation, filterName }: any =
    useAppSelector((state) => state.employee);

  const dispatch = useAppDispatch();
  const showToast = useToastify();

  const onDialogClose = () => {
    dispatch(setDrawer(false));
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("enter valid email")
      .required("Email is required"),
    location: Yup.string().required("Location is required"),
  });

  return (
    <Drawer open={openDrawer} onClose={onDialogClose} anchor="right">
      <div style={{ padding: "16px" }}>
        <h2 className="font-bold text-2xl">
          {editRow._id ? "Edit Employee" : "Add Employee"}
        </h2>
      </div>
      <Formik
        initialValues={{
          name: editRow ? editRow?.name : "",
          email: editRow ? editRow?.email : "",
          location: editRow ? editRow?.location : "",
          createdBy: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          values.createdBy = getUserDetails().payload.id;
          const res = editRow._id
            ? await dispatch(editEmployee({ id: editRow?._id, data: values }))
            : await dispatch(createEmployee(values));
          await dispatch(
            fetchEmployee({ location: filterLocation, name: filterName })
          );
          await dispatch(setFilterLocation("All"));
          await dispatch(setFilterName("All"));
          if (res.meta.requestStatus === "fulfilled") {
            showToast(
              editRow._id
                ? "Employee Edited  successfully"
                : "Employee Added successfully",
              "success"
            );
          } else {
            showToast("Please Enter unique Email", "error");
          }
          await dispatch(setDrawer(false));
        }}
      >
        {({ values, errors, touched, dirty }) => (
          <Form>
            <div style={{ padding: "0px 32px 0px 32px" }}>
              <div className="mt-5" style={{ height: "64px" }}>
                <label htmlFor="name">Name *</label>
                <Field
                  as={TextField}
                  name="name"
                  fullWidth
                  size="small"
                  placeholder="Name"
                  error={!!errors.name && !!touched.name}
                  helperText={errors.name && touched.name && errors.name}
                />
              </div>
              <div className="mt-5" style={{ height: "70px" }}>
                <label htmlFor="description">Email*</label>
                <Field
                  as={TextField}
                  name="email"
                  fullWidth
                  size="small"
                  placeholder="email"
                  error={!!errors.email && !!touched.email}
                  helperText={errors.email && touched.email && errors.email}
                />
              </div>
              <div className="mt-5" style={{ height: "70px" }}>
                <label htmlFor="location">Location*</label>
                <Field
                  as={TextField}
                  name="location"
                  fullWidth
                  size="small"
                  placeholder="location"
                  error={!!errors.location && !!touched.location}
                  helperText={
                    errors.location && touched.location && errors.location
                  }
                />
              </div>
              <div className="w-full flex gap-2 justify-end mt-6">
                <Button
                  variant="outlined"
                  type="button"
                  onClick={() => dispatch(setDrawer(false))}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading || !dirty}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default EmployeeForm;
