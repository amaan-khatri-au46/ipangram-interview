import DepartmentActions from "./components/DepartmentActions";
import DepartmentTable from "./components/DepartmentTable";
import DepartmentForm from "./components/DepartmentForm";
import DepartmentDeleteDailog from "./components/DepartmentDeleteDailog";

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
