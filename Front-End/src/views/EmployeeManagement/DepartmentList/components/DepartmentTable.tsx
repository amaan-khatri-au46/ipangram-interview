import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/store/store";
import {
  fetchEmployeeName,
  setDeleteRow,
  setDrawer,
  setEditRow,
  setOpenDeleteDailog,
  setPageIndex,
  setPageSize,
} from "src/store/slices/departmentSlice";
import { CiEdit, CiTrash } from "react-icons/ci";
import DataTable from "src/components/DataTable";
import { fetchDepartment } from "src/store/slices/departmentSlice";
import Pagination from "src/components/Pagination";
import { MenuItem, Select } from "@mui/material";
import { pageSizeOption } from "src/utils/commonFunction/common";

const DepartmentTable = () => {
  const dispatch = useAppDispatch();
  const { departmentTableList, loading, pagination } = useAppSelector(
    (state) => state?.department
  );

  const data: any = departmentTableList?.map((row, index) => ({
    ...row,
    serialNumber: index + 1,
  }));

  useEffect(() => {
    dispatch(
      fetchDepartment({
        pageIndex: pagination?.pageIndex,
        pageSize: pagination?.pageSize,
      })
    );
    dispatch(fetchEmployeeName());
  }, [dispatch, pagination]);

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
          <div className="flex justify-center gap-4 w-full cursor-pointer">
            <div>
              <button
                onClick={() => {
                  dispatch(setDrawer(true));
                  dispatch(setEditRow(row.original));
                }}
              >
                <CiEdit style={{ fontSize: "16px" }} />
              </button>
            </div>
            <div>
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

  return (
    <div>
      <DataTable columns={columns} data={data} loading={loading} />
      <div className="fixed bottom-2 w-full flex justify-between">
        {pagination?.total > 0 && (
          <div
            className="fixed p-2 bg-white mb-0 h-12 
            flex bottom-0 justify-between w-full items-center "
            style={{ boxShadow: "0px -5px 5px -5px #f0f0f0" }}
          >
            <Pagination
              currentPage={pagination.pageIndex}
              total={pagination?.total}
              pageSize={pagination?.pageSize}
              onChange={(pageNumber) => {
                dispatch(setPageIndex(pageNumber));
              }}
            />
            <div className="text-sm ">1-{pagination?.total} Items</div>
            <Select
              value={pagination.pageSize}
              size="small"
              className="mr-2"
              onChange={(e) => {
                dispatch(setPageIndex(1));
                dispatch(setPageSize(e.target.value));
              }}
            >
              {pageSizeOption.map((option: any) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentTable;
