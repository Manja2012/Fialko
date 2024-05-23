import express from "express";
import { verifieToken } from '../auth/auth.controller.js';

import {
addReview,
getAllReviews,
getByIdReview,
updateByIdReview,
deleteByIdReview
} from "../controllers/reviews.controller.js";

const router = express.Router();

router.post("/add", addReview);
router.get('/', getAllReviews);
router.get('/:id', getByIdReview);
router.put('/:id', verifieToken, updateByIdReview);
router.delete('/:id', verifieToken, deleteByIdReview);


export default router;