import express from "express";
import { verifieToken } from "../middlewares/auth.middleware.js";
import { addContact, getAllContacts, getByIdContact, deleteByIdContact } from "../controllers/contacts.controller.js";
import { validateContact } from "../validators/contacts.validator.js";  // Импорт валидации
import { handleValidationErrors } from "../middlewares/validation.middleware.js";  // Импорт обработчика ошибок

const router = express.Router();

router.post("/add", validateContact, handleValidationErrors, addContact);  // Добавляем валидацию
router.get("/", getAllContacts);
router.get("/:id", getByIdContact);
router.delete("/:id", verifieToken, deleteByIdContact);

export default router;
