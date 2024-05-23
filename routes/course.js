import express from "express";
import { verifieToken } from '../auth/auth.controller.js';

import {
addCourse,
getAllCourses,
getByIdCourse,
updateByIdCourse,
deleteByIdCourse,
getReview
} from "../controllers/courses.controller.js";

const router = express.Router();

router.post("/add", addCourse);
router.get('/', getAllCourses);
router.get('/:id', getByIdCourse);
router.get('/:id', getByIdCourse);
router.put('/:id', verifieToken, updateByIdCourse);
router.delete('/:id', verifieToken, deleteByIdCourse);
router.get('/:id/review', getReview)

export default router;