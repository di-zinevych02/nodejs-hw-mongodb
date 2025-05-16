import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getContactsController, getContactByIdController } from "../controllers/contacts.js";
import { Router } from 'express';
const router = Router();
router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
export default router;