import { useEffect, useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { Button, FormControl, MenuItem, Popover, Select } from "@mui/material";
import { FaFilter } from "react-icons/fa6";
import {
  fetchEmployeeLocation,
  fetchEmployeeName,
  setDrawer,
  setEditRow,
  setFilterLocation,
  setFilterName,
} from "../../../store/slices/employeeSlice";

const EmployeeActions = () => {
  const { employeeLocation, employeeName, filterLocation, filterName } =
    useAppSelector((state) => state.employee);
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEmployeeLocation());
    dispatch(fetchEmployeeName());
  }, [dispatch]);

  return (
    <div className="lg:flex items-center justify-between mx-4 mt-4 mb-6">
      <div className="flex items-center gap-2 text-2xl font-bold">
        <h4>Employee</h4>
      </div>
      <div style={{ display: "flex" }} className="gap-4">
        <Button
          variant="contained"
          startIcon={<FaFilter style={{ fontSize: "14px" }} />}
          onClick={(event: any) => {
            setAnchorEl(event.currentTarget);
          }}
          className="ml-2"
        >
          Filter
        </Button>
        <Popover
          id={anchorEl ? "simple-popover" : undefined}
          open={anchorEl}
          anchorEl={anchorEl}
          onClose={() => {
            setAnchorEl(null);
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="px-4 py-4 ">
            <div style={{ width: "200px" }}>
              <FormControl fullWidth>
                <label htmlFor="location">Name</label>
                <Select
                  value={filterName}
                  size="small"
                  onChange={(e) => {
                    dispatch(setFilterName(e.target.value));
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflowY: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem key="all" value="All">
                    All
                  </MenuItem>
                  {employeeName.map((option: any) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="mt-2" style={{ width: "200px" }}>
              <FormControl fullWidth>
                <label htmlFor="name">Location</label>
                <Select
                  value={filterLocation}
                  size="small"
                  onChange={(e) => {
                    dispatch(setFilterLocation(e.target.value));
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflowY: "auto",
                      },
                    },
                  }}
                >
                  <MenuItem key="all" value="All">
                    All
                  </MenuItem>
                  {employeeLocation.map((option: any) => (
                    <MenuItem key={option.id} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </Popover>
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

export default EmployeeActions;
