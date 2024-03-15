import React from "react";
import { useTable, Column } from "react-table";
import { CircularProgress } from "@mui/material";

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  loading: boolean;
}

const DataTable = <T extends object>({
  columns,
  data,
  loading,
}: DataTableProps<T>) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div style={{ height: "90vh", overflowY: "scroll" }}>
      <table {...getTableProps()} style={{ width: "100%" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px #f8fafb",
                    background: "#f8fafb",
                    color: "black",
                  }}
                  className="font-normal"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {loading ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="flex justify-center items-center h-[65vh]">
                  <CircularProgress />
                </div>
              </td>
            </tr>
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="flex justify-center items-center h-[65vh]">
                  No data found
                </div>
              </td>
            </tr>
          ) : (
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
