import express from "express";
import { verifieToken } from '../auth/auth.controller.js';

import {
addReservation,
// getAllReservations,
// getByIdReservation,
// deleteByIdReservation
} from "../controllers/reservations.controller.js";

const router = express.Router();

router.post("/add", addReservation);
// router.get('/', getAllReservations);
// router.get('/:id', getByIdReservation);
// router.delete('/:id', verifieToken, deleteByIdReservation);


export default router;