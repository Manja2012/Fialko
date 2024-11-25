import express from "express";
import { verifieToken } from "../middlewares/auth.middleware.js";

import {
  addContact,
  getAllContacts,
  getByIdContact,
  deleteByIdContact,
} from "../controllers/contacts.controller.js";

const router = express.Router();

router.post("/add", addContact);
router.get("/", getAllContacts);
router.get("/:id", getByIdContact);
router.delete("/:id", verifieToken, deleteByIdContact);

export default router;
