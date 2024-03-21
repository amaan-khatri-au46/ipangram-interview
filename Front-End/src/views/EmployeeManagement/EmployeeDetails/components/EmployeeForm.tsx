import { Button, Drawer, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/store/store";
import {
  createEmployee,
  editEmployee,
  fetchEmployee,
  setDrawer,
  setFilterLocation,
  setFilterName,
} from "src/store/slices/employeeDetailSlice";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useToastify from "src/utils/hooks/useToastify";
import { getUserDetails } from "src/utils/commonFunction/common";

const EmployeeForm = () => {
  const {
    openDrawer,
    editRow,
    loading,
    filterLocation,
    filterName,
    pagination,
  }: any = useAppSelector((state) => state.employeeDetail);

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
      <div className="p-2">
        <h2 className="font-semibold text-2xl">
          {editRow._id ? "EDIT EMPLOYEE" : "ADD EMPLOYEE"}
        </h2>
      </div>
      <div style={{ height: "1px" }} className="bg-gray-400 mt-1 w-full"></div>
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
            fetchEmployee({
              location: filterLocation,
              name: filterName,
              pageIndex: pagination?.pageIndex,
              pageSize: pagination?.pageSize,
            })
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
          <Form className="w-96">
            <div className="px-8 py-1">
              <div className="mt-5 h-16">
                <label
                  htmlFor="name"
                  className={`block font-semibold text-sm ${
                    errors.name && touched.name ? "text-red-500" : ""
                  }`}
                >
                  Name *
                </label>
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
              <div className="mt-5 h-16">
                <label
                  htmlFor="email"
                  className={`block font-semibold text-sm ${
                    errors.email && touched.email ? "text-red-500" : ""
                  }`}
                >
                  Email*
                </label>
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
              <div className="mt-5 h-20">
                <label
                  htmlFor="location"
                  className={`block font-semibold text-sm ${
                    errors.location && touched.location ? "text-red-500" : ""
                  }`}
                >
                  Location*
                </label>
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
