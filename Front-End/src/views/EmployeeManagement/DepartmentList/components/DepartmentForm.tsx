import {
  Button,
  Drawer,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  createDepartment,
  editDepartment,
  fetchDepartment,
  setDrawer,
} from "../../../../store/slices/departmentSlice";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useToastify from "../../../../utils/hooks/useToastify";

const DepartmentForm = () => {
  const { openDrawer, editRow, loading, employeeName, pagination }: any =
    useAppSelector((state) => state.department);

  const dispatch = useAppDispatch();
  const showToast = useToastify();

  const onDialogClose = () => {
    dispatch(setDrawer(false));
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    budget: Yup.string().required("Budget is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string().required("Description is required"),
    employees: Yup.array(),
  });

  return (
    <Drawer open={openDrawer} onClose={onDialogClose} anchor="right">
      <div className="p-2">
        <h2 className="font-bold text-2xl">
          {editRow._id ? "EDIT DEPARTMENT" : "ADD DEPARTMENT"}
        </h2>
      </div>
      <div style={{ height: "1px" }} className="bg-gray-400 mt-1 w-full"></div>
      <Formik
        initialValues={{
          name: editRow ? editRow?.name : "",
          budget: editRow ? editRow?.budget : null,
          location: editRow ? editRow?.location : "",
          description: editRow ? editRow?.description : "",
          employees: editRow
            ? editRow?.employees?.map((employee: any) => employee?._id)
            : [],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const res = editRow._id
            ? await dispatch(editDepartment({ id: editRow?._id, data: values }))
            : await dispatch(createDepartment(values));
          await dispatch(
            fetchDepartment({
              pageIndex: pagination?.pageIndex,
              pageSize: pagination?.pageSize,
            })
          );
          if (res.meta.requestStatus === "fulfilled") {
            showToast(
              editRow._id
                ? "Department Edited  successfully"
                : "Department Added successfully",
              "success"
            );
          } else {
            showToast("Please Enter unique Email", "error");
          }
          await dispatch(setDrawer(false));
        }}
      >
        {({ values, errors, touched, dirty, setFieldValue }) => (
          <Form className="w-96">
            <div className="px-8 py-1">
              <div className="mt-5 h-16">
                <label
                  htmlFor="name"
                  className={`block font-semibold text-sm ${
                    errors.name && touched.name ? "text-red-500" : ""
                  }`}
                >
                  Department *
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
                  placeholder="Location"
                  error={!!errors.location && !!touched.location}
                  helperText={
                    errors.location && touched.location && errors.location
                  }
                />
              </div>
              <div className="mt-5 h-16">
                <label
                  htmlFor="budget"
                  className={`block font-semibold text-sm ${
                    errors.budget && touched.budget ? "text-red-500" : ""
                  }`}
                >
                  Budget*
                </label>
                <Field
                  as={TextField}
                  name="budget"
                  type="number"
                  fullWidth
                  size="small"
                  placeholder="Budget"
                  error={!!errors.budget && !!touched.budget}
                  helperText={errors.budget && touched.budget && errors.budget}
                />
              </div>
              <div className="mt-5 h-28">
                <label
                  htmlFor="description"
                  className={`block font-semibold text-sm ${
                    errors.description && touched.description
                      ? "text-red-500"
                      : ""
                  }`}
                >
                  Description*
                </label>
                <Field
                  as={TextField}
                  name="description"
                  fullWidth
                  size="small"
                  placeholder="Description"
                  multiline
                  rows={2}
                  error={!!errors.description && !!touched.description}
                  helperText={
                    errors.description &&
                    touched.description &&
                    errors.description
                  }
                />
              </div>
              <div>
                <div>
                  <FormControl fullWidth>
                    <label>Employees </label>
                    <Field
                      sx={{ Window: "100%" }}
                      as={Select}
                      name="employees"
                      size="small"
                      multiple
                      value={values.employees || []}
                      onChange={(event: any) =>
                        setFieldValue("employees", event.target.value)
                      }
                      error={!!errors.employees && touched.employees}
                      helperText={
                        errors.employees &&
                        touched.employees &&
                        errors.employees
                      }
                      labelId="employees-label"
                      renderValue={(selected: any) =>
                        selected
                          .map(
                            (id: string) =>
                              employeeName.find(
                                (employee: any) => employee.id === id
                              )?.name
                          )
                          .join(", ")
                      }
                      style={{ marginTop: "8px" }}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 200,
                          },
                        },
                      }}
                    >
                      {employeeName.map((option: any) => (
                        <MenuItem key={option.id} value={option.id}>
                          <Checkbox
                            checked={
                              values?.employees?.indexOf(option?.id) > -1
                            }
                          />
                          {option.name}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </div>
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

export default DepartmentForm;
