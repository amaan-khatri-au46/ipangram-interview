import { useAppDispatch, useAppSelector } from "src/store/store";
import {
  deleteDepartment,
  fetchDepartment,
  setOpenDeleteDailog,
} from "src/store/slices/departmentSlice";
import useToastify from "src/utils/hooks/useToastify";
import ConfirmDailoag from "src/components/ConfirmDailoag";

const DepartmentDeleteDailog = () => {
  const dispatch = useAppDispatch();
  const showToast = useToastify();

  const { openDeleteDailog, loading, deleteRow, pagination }: any =
    useAppSelector((state) => state.department);

  const handleClose = () => {
    dispatch(setOpenDeleteDailog(false));
  };

  const handleDelete = async () => {
    await dispatch(deleteDepartment(deleteRow?._id));
    await dispatch(
      fetchDepartment({
        pageIndex: pagination?.pageIndex,
        pageSize: pagination?.pageSize,
      })
    );
    handleClose();
    showToast("Department Deleted Successfully", "success");
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
        Are you sure you want to delete this department <b>{deleteRow.name}?</b>
      </p>
    </ConfirmDailoag>
  );
};

export default DepartmentDeleteDailog;
