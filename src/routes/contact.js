import express from "express";
import { verifieToken } from "../middlewares/auth.middleware.js";
import {
  addContact,
  getAllContacts,
  getByIdContact,
  deleteByIdContact,
} from "../controllers/contacts.controller.js";
import { validateContact } from "../validators/contacts.validator.js"; 
import { handleValidationErrors } from "../middlewares/validation.middleware.js"; 

const router = express.Router();

router.post("/add", validateContact, handleValidationErrors, addContact); 
router.get("/", getAllContacts);
router.get("/:id", getByIdContact);
router.delete("/:id", verifieToken, deleteByIdContact);

export default router;
