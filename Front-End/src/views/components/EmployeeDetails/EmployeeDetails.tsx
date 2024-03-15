import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchEmployeeDetail } from "../../../store/slices/employeeSlice";
import DataTable from "../../../components/DataTable";

const EmployeeDetails = () => {
  const dispatch = useAppDispatch();
  const { employeeDetailList, loading } = useAppSelector(
    (state) => state.employee
  );

  const rowsWithIds: any = employeeDetailList.map((row, index) => ({
    ...row,
    id: index + 1,
    serialNumber: index + 1,
  }));

  useEffect(() => {
    dispatch(fetchEmployeeDetail());
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
        <div className="flex items-center gap-2 text-2xl font-bold">
          <h4>Employee</h4>
        </div>
      </div>
      <div className="mt-4">
        <DataTable columns={columns} data={rowsWithIds} loading={loading} />
      </div>
    </div>
  );
};

export default EmployeeDetails;
