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
import { authenticate } from '../midllewares/authenticate.js';
const router = Router();
router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));
router.patch('/:contactId', isValidId, validateBody(updateContactSchema),ctrlWrapper(patchContactController));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
//она будет примінятися до всіх роутів цього роутера. Тобто, вона відпрацює на всіх роутах, що починаються зі /contacts
router.use(authenticate);
router.get('/', ctrlWrapper(getAllContactsController));
export default router;
