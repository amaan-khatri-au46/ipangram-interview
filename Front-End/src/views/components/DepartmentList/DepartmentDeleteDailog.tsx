import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  deleteDepartment,
  fetchDepartment,
  setOpenDeleteDailog,
} from "../../../store/slices/departmentSlice";
import useToastify from "../../../utils/hooks/useToastify";
import ConfirmDailoag from "../../../components/ConfirmDailoag";

const DepartmentDeleteDailog = () => {
  const dispatch = useAppDispatch();
  const showToast = useToastify();

  const { openDeleteDailog, loading, deleteRow }: any = useAppSelector(
    (state) => state.department
  );

  const handleClose = () => {
    dispatch(setOpenDeleteDailog(false));
  };

  const handleDelete = async () => {
    await dispatch(deleteDepartment(deleteRow?._id));
    await dispatch(fetchDepartment());
    handleClose();
    showToast("Employee Deleted Successfully", "success");
  };

  return (
    <ConfirmDailoag
      open={openDeleteDailog}
      onCancel={handleClose}
      onDelete={handleDelete}
      loading={loading}
      title="Delete Department"
    >
      <p>
        Are you sure you want to delete this employee <b>{deleteRow.name}?</b>
      </p>
    </ConfirmDailoag>
  );
};

export default DepartmentDeleteDailog;
