import React from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeForm from "./EmployeeForm";
import EmployeeActions from "./EmployeeActions";
import EmployeeDeleteDialog from "./EmployeeDeleteDailog";

const EmployeeList = () => {
  return (
    <div>
      <EmployeeDeleteDialog />
      <EmployeeForm />
      <EmployeeActions />
      <EmployeeTable />
    </div>
  );
};

export default EmployeeList;
