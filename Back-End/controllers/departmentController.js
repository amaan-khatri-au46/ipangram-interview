const Department = require("../models/departmentModel");

exports.createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Failed to create department" });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    let departments = await Department.find();
    departments = await Department.populate(departments, { path: "employees" });
    const isManager = req.user.role === "manager";
    if (!isManager) {
      departments = departments.map((department) => {
        const { employees, ...rest } = department.toObject();
        return rest;
      });
    }
    res.json(departments);
  } catch (error) {
    console.error("Error getting all departments:", error);
    res.status(500).json({ error: "Failed to retrieve departments" });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ error: "Failed to fetch department" });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ error: "Failed to update department" });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ error: "Failed to delete department" });
  }
};
