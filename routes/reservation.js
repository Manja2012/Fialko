import express from "express";
import { verifieToken } from '../auth/auth.controller.js';

import {
addReservation,
getAllReservations,
getByIdReservation,
updateByIdReservation,
deleteByIdReservation
} from "../controllers/reservations.controller.js";

const router = express.Router();

router.post("/add", addReservation);
router.get('/', getAllReservations);
router.get('/:id', getByIdReservation);
router.put('/:id', verifieToken, updateByIdReservation);
router.delete('/:id', verifieToken, deleteByIdReservation);


export default router;