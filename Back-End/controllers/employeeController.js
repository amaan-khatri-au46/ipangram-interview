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
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ error: "Email must be unique" });
    }
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Failed to create employee" });
  }
};

const getAllEmployees = async (req, res) => {
  const page = parseInt(req.query.pageIndex) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;
  try {
    let query = {};
    if (req.user.role !== "manager") {
      query.createdBy = req.user.id;
    }
    const totalEmployees = await Employee.countDocuments(query);
    const employees = await Employee.find(query).skip(skip).limit(pageSize);
    return res.json({
      employees,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / pageSize),
      totalEmployees,
    });
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
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ error: "Email must be unique" });
    }
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

  if (userRole === "employee") {
    filterCriteria.createdBy = req.user.id;
  }

  if (name && name !== "All") {
    filterCriteria.name = { $regex: new RegExp(name, "i") };
  }

  try {
    const filteredCount = await Employee.countDocuments(filterCriteria);
    const page = parseInt(req.query.pageIndex) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    let employees;
    if (filteredCount > 0) {
      employees = await Employee.find(filterCriteria)
        .skip(skip)
        .limit(pageSize);
    } else {
      employees = [];
    }

    res.json({
      employees,
      currentPage: page,
      totalPages: Math.ceil(filteredCount / pageSize),
      totalEmployees: filteredCount,
    });
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
