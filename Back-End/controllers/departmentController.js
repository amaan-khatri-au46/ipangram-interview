const Department = require("../models/departmentModel");

const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Failed to create department" });
  }
};

const getAllDepartments = async (req, res) => {
  const page = parseInt(req.query.pageIndex) || 1;
  const pageSize = parseInt(req.query.pageSize);
  const skip = (page - 1) * pageSize;
  try {
    let query = {};
    if (req.user.role !== "manager") {
      query.createdBy = req.user.id;
    }
    const totalDepartments = await Department.countDocuments(query);
    let departments = await Department.find(query)
      .populate("employees")
      .skip(skip)
      .limit(pageSize);
    if (req.user.role !== "manager") {
      departments = departments.map((department) => {
        const { employees, ...rest } = department.toObject();
        return rest;
      });
    }
    res.json({
      departments,
      currentPage: page,
      totalPages: Math.ceil(totalDepartments / pageSize),
      totalDepartments,
    });
  } catch (error) {
    console.error("Error getting all departments:", error);
    res.status(500).json({ error: "Failed to retrieve departments" });
  }
};

const getDepartmentById = async (req, res) => {
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

const updateDepartment = async (req, res) => {
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

const deleteDepartment = async (req, res) => {
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


module.exports = {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  getDepartmentById,
  deleteDepartment
}