import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import DataTable from "../../../components/DataTable";
import {
  fetchEmployeeDetail,
  setPageIndex,
  setPageSize,
} from "../../../store/slices/employeeDirectorySlice";
import Pagination from "../../../components/Pagination";
import { MenuItem, Select } from "@mui/material";
import { pageSizeOption } from "../../../utils/commonFunction/common";

const EmployeeDirectory = () => {
  const dispatch = useAppDispatch();
  const { employeeDirectoryList, loading, pagination } = useAppSelector(
    (state) => state.employeeDirectory
  );

  const data: any = employeeDirectoryList?.map((row: any, index: any) => ({
    ...row,
    serialNumber: index + 1,
  }));

  useEffect(() => {
    dispatch(
      fetchEmployeeDetail({
        pageIndex: pagination?.pageIndex,
        pageSize: pagination?.pageSize,
      })
    );
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
    ],
    []
  );

  return (
    <div>
      <div className="lg:flex items-center justify-between mx-4 mt-4 mb-6">
        <div className="flex items-center gap-2 text-2xl font-medium">
          <p>EMPLOYEE DIRECTORY</p>
        </div>
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={data} loading={loading} />
        <div className="fixed bottom-2 w-full flex justify-between">
          {pagination?.total > 0 && (
            <div
              className="fixed p-2 bg-white mb-0 h-12 
            flex bottom-0 justify-between w-full items-center"
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
    </div>
  );
};

export default EmployeeDirectory;
