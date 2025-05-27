import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../midllewares/validateBody.js";
import { createContactSchema, updateContactSchema } from '../validation/contact.js';
import {
    getAllContactsController,
    getContactByIdController,
    createContactController,
    patchContactController,
    deleteContactController
} from "../controllers/contacts.js";
import { isValidId } from '../midllewares/isValidId.js';
import { Router } from 'express';
const router = Router();
router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema),ctrlWrapper(patchContactController));
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));
export default router;
