import { Router } from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
} from "../controllers/studentsController.js";

const router = Router();

router.get("/students", getStudents);
router.get("/students/:studentId", getStudentById);
router.post("/students", createStudent);

export default router;
