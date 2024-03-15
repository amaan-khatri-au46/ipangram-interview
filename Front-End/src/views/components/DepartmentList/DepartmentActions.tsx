import { HiOutlinePlusCircle } from "react-icons/hi";
import { useAppDispatch } from "../../../store/store";
import { Button } from "@mui/material";
import { setDrawer, setEditRow } from "../../../store/slices/departmentSlice";

const DepartmentActions = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="lg:flex items-center justify-between mx-4 mt-4 mb-6">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <h4>Department</h4>
      </div>
      <div style={{ display: "flex" }} className="gap-4">
        <Button
          variant="contained"
          style={{ width: "100px" }}
          startIcon={<HiOutlinePlusCircle />}
          onClick={() => {
            dispatch(setDrawer(true));
            dispatch(setEditRow([]));
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default DepartmentActions;
