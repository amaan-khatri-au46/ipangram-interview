import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  deleteEmployee,
  fetchEmployee,
  setOpenDeleteDailog,
} from "../../../store/slices/employeeSlice";
import useToastify from "../../../utils/hooks/useToastify";
import ConfirmDailoag from "../../../components/ConfirmDailoag";

const EmployeeDeleteDialog = () => {
  const dispatch = useAppDispatch();
  const showToast = useToastify();

  const {
    openDeleteDailog,
    loading,
    deleteRow,
    filterLocation,
    filterName,
  }: any = useAppSelector((state) => state.employee);

  const handleClose = () => {
    dispatch(setOpenDeleteDailog(false));
  };

  const handleDelete = async () => {
    await dispatch(deleteEmployee(deleteRow?._id));
    await dispatch(
      fetchEmployee({ location: filterLocation, name: filterName })
    );
    handleClose();
    showToast("Employee Deleted Successfully", "success");
  };

  return (
    <ConfirmDailoag
      open={openDeleteDailog}
      onCancel={handleClose}
      onDelete={handleDelete}
      loading={loading}
      title="Delete Employee"
    >
      <p>
        Are you sure you want to delete this employee <b>{deleteRow.name}?</b>
      </p>
    </ConfirmDailoag>
  );
};

export default EmployeeDeleteDialog;
