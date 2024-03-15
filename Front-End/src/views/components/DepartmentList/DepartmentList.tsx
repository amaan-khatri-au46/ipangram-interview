import React from "react";
import DepartmentActions from "./DepartmentActions";
import DepartmentTable from "./DepartmentTable";
import DepartmentForm from "./DepartmentForm";
import DepartmentDeleteDailog from "./DepartmentDeleteDailog";

const DepartmentList = () => {
  return (
    <div>
      <DepartmentActions />
      <DepartmentDeleteDailog />
      <DepartmentForm />
      <DepartmentTable />
    </div>
  );
};

export default DepartmentList;
