import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchEmployee,
  setDeleteRow,
  setDrawer,
  setEditRow,
  setOpenDeleteDailog,
} from "../../../store/slices/employeeSlice";
import { CiEdit, CiTrash } from "react-icons/ci";
import DataTable from "../../../components/DataTable";
import { getUserDetails } from "../../../utils/commonFunction/common";
import { Column } from "react-table";

const EmployeeTable = () => {
  const dispatch = useAppDispatch();
  const { employeeTableList, loading, filterLocation, filterName } =
    useAppSelector((state) => state.employee);

  const rowsWithIds: any = employeeTableList.map((row, index) => ({
    ...row,
    id: index + 1,
    serialNumber: index + 1,
  }));

  useEffect(() => {
    dispatch(fetchEmployee({ location: filterLocation, name: filterName }));
  }, [dispatch, filterLocation, filterName]);

  const columns = useMemo(() => {
    const userRole = getUserDetails().payload.role;
    const filteredColumns = [
      {
        Header: "#",
        accessor: "serialNumber",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
      {
        Header: "Employee Name",
        accessor: "name",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value ? value : "-"}</div>
        ),
      },
      {
        Header: "Employee Email",
        accessor: "email",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value ? value : "-"}</div>
        ),
      },
      {
        Header: "Employee Location",
        accessor: "location",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value ? value : "-"}</div>
        ),
      },
      userRole === "manager"
        ? {
            Header: "Action",
            accessor: "actions",
            Cell: ({ row }: any) => (
              <div
                className="flex justify-center w-full"
                style={{ cursor: "pointer" }}
              >
                <div className="w-1/3 text-center">
                  <button
                    onClick={() => {
                      dispatch(setDrawer(true));
                      dispatch(setEditRow(row.original));
                    }}
                  >
                    <CiEdit style={{ fontSize: "16px" }} />
                  </button>
                </div>
                <div className="w-1/7 text-center cursor-pointer">
                  <button
                    onClick={() => {
                      dispatch(setDeleteRow(row.original));
                      dispatch(setOpenDeleteDailog(true));
                    }}
                  >
                    <CiTrash style={{ fontSize: "16px" }} />
                  </button>
                </div>
              </div>
            ),
          }
        : null,
    ];
    return filteredColumns.filter((column) => column !== null) as Column<{
      [x: string]: {};
    }>[];
  }, [dispatch]);

  return <DataTable columns={columns} data={rowsWithIds} loading={loading} />;
};

export default EmployeeTable;
