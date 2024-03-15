const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  filterEmployees,
  getEmployeesLocations,
  getEmployeeNames,
} = require("../controllers/employeeController");
const { checkUserRole } = require("../middleware/checkManagerRole");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);
router.post("/employees", createEmployee);
router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.put("/employees/:id", checkUserRole("manager"), updateEmployee);
router.delete("/employees/:id", checkUserRole("manager"), deleteEmployee);
router.get("/employees/filter", filterEmployees);
router.get("/employee/locations", getEmployeesLocations);
router.get("/employee/name", getEmployeeNames);

module.exports = router;
