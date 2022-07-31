import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeesController.js";
import { Me, Login, Logout } from "../controllers/authControllers.js";
import { userVerify, adminOnly } from "../middleware/userAuthentication.js";

const router = express.Router();

router.get("/user", userVerify, adminOnly, getAllUsers);
router.get("/user/:id", userVerify, adminOnly, getUserById);
router.post("/user", userVerify, adminOnly, createUser);
router.put("/user/:id", userVerify, adminOnly, updateUser);
router.delete("/user/:id", userVerify, adminOnly, deleteUser);

router.get("/employee", userVerify, getAllEmployees);
router.get("/employee/:id", userVerify, getEmployeeById);
router.post("/employee", userVerify, createEmployee);
router.patch("/employee/:id", userVerify, updateEmployee);
router.delete("/employee/:id", userVerify, deleteEmployee);

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", Logout);

export default router;
