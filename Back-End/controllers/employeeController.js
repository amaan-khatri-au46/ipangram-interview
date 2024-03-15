const Employee = require("../models/employeeModel");

const createEmployee = async (req, res) => {
  try {
    const { name, email, role, location, createdBy } = req.body;
    const employee = new Employee({
      name,
      email,
      role,
      location,
      createdBy,
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Failed to create employee" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    if (req.user.role === "manager") {
      const employees = await Employee.find();
      return res.json(employees);
    } else {
      const employees = await Employee.find({ createdBy: req.user.id });
      return res.json(employees);
    }
  } catch (error) {
    console.error("Error getting all employees:", error);
    res.status(500).json({ error: "Failed to retrieve employees" });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  if (id === "filter") {
    return filterEmployees(req, res);
  }
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    if (employee.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message:
          "Unauthorized: You are not allowed to access this employee data",
      });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error getting employee by ID:", error);
    res.status(500).json({ error: "Failed to retrieve employee" });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

const filterEmployees = async (req, res) => {
  const { location, name } = req.query;
  const userRole = req.user.role;
  let filterCriteria = {};
  if (location && location !== "All") {
    filterCriteria.location = { $regex: new RegExp(location, "i") };
  }
  try {
    let employees;
    if (userRole === "employee") {
      const userId = req.user.id;
      filterCriteria.createdBy = userId;
    }
    if (name && name !== "All") {
      employees = await Employee.find(filterCriteria).find({
        name: { $regex: new RegExp(name, "i") },
      });
    } else {
      employees = await Employee.find(filterCriteria);
    }
    res.json(employees);
  } catch (error) {
    console.error("Error filtering employees:", error);
    res.status(500).json({ error: "Failed to filter employees" });
  }
};

const getEmployeesLocations = async (req, res) => {
  try {
    const userRole = req.user.role;
    let filterCriteria = {};
    if (userRole === "employee") {
      const userId = req.user.id;
      filterCriteria.createdBy = userId;
    }
    const employees = await Employee.find(filterCriteria, "location _id").sort({
      location: 1,
    });
    const locationsWithIds = employees.map((employee) => ({
      id: employee._id,
      location: employee.location,
    }));
    res.json(locationsWithIds);
  } catch (error) {
    console.error("Error getting employees' locations:", error);
    res.status(500).json({ error: "Failed to retrieve employees' locations" });
  }
};

const getEmployeeNames = async (req, res) => {
  try {
    const userRole = req.user.role;
    let filterCriteria = {};
    if (userRole === "employee") {
      const userId = req.user.id;
      filterCriteria.createdBy = userId;
    }
    const employees = await Employee.find(filterCriteria, "name _id").sort({
      name: 1,
    });
    const namesWithIds = employees.map((employee) => ({
      id: employee._id,
      name: employee.name,
    }));
    res.json(namesWithIds);
  } catch (error) {
    console.error("Error getting employees' names:", error);
    res.status(500).json({ error: "Failed to retrieve employees' names" });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  filterEmployees,
  getEmployeesLocations,
  getEmployeeNames,
};
