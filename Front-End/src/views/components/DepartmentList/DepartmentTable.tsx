import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  fetchEmployeeName,
  setDeleteRow,
  setDrawer,
  setEditRow,
  setOpenDeleteDailog,
} from "../../../store/slices/departmentSlice";
import { CiEdit, CiTrash } from "react-icons/ci";
import DataTable from "../../../components/DataTable";

import { fetchDepartment } from "../../../store/slices/departmentSlice";

const DepartmentTable = () => {
  const dispatch = useAppDispatch();
  const { departmentTableList, loading } = useAppSelector(
    (state) => state.department
  );

  const data: any = departmentTableList.map((row, index) => ({
    ...row,
    id: index + 1,
    serialNumber: index + 1,
  }));

  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchEmployeeName());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "serialNumber",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
      {
        Header: "Department",
        accessor: "name",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value ? value : "-"}</div>
        ),
      },
      {
        Header: "Location",
        accessor: "location",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value ? value : "-"}</div>
        ),
      },
      {
        Header: "Budget",
        accessor: "budget",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value ? value : "-"}</div>
        ),
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value ? value : "-"}</div>
        ),
      },
      {
        Header: "Employees",
        accessor: "employees",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>
            {value.map((employee: any) => (
              <div key={employee._id}>
                <div>{employee.name ? employee.name : "-"}</div>
              </div>
            ))}
          </div>
        ),
      },
      {
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
      },
    ],
    [dispatch]
  );

  return <DataTable columns={columns} data={data} loading={loading} />;
};

export default DepartmentTable;
