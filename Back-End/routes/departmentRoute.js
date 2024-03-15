const express = require("express");
const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");
const { checkUserRole } = require("../middleware/checkManagerRole");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware)
router.use(checkUserRole("manager"));

router.post("/department", createDepartment);
router.get("/department", getAllDepartments);
router.get("/department/:id", getDepartmentById);
router.put("/department/:id", updateDepartment);
router.delete("/department/:id", deleteDepartment);

module.exports = router;
