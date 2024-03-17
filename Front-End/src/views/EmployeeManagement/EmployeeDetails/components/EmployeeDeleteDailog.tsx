import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  deleteEmployee,
  fetchEmployee,
  setOpenDeleteDailog,
} from "../../../../store/slices/employeeDetailSlice";
import useToastify from "../../../../utils/hooks/useToastify";
import ConfirmDailoag from "../../../../components/ConfirmDailoag";

const EmployeeDeleteDialog = () => {
  const dispatch = useAppDispatch();
  const showToast = useToastify();

  const {
    openDeleteDailog,
    loading,
    deleteRow,
    filterLocation,
    filterName,
    pagination,
  }: any = useAppSelector((state) => state.employeeDetail);

  const handleClose = () => {
    dispatch(setOpenDeleteDailog(false));
  };

  const handleDelete = async () => {
    await dispatch(deleteEmployee(deleteRow?._id));
    await dispatch(
      fetchEmployee({
        location: filterLocation,
        name: filterName,
        pageIndex: pagination?.pageIndex,
        pageSize: pagination?.pageSize,
      })
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
