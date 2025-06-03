import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../midllewares/validateBody.js';
import {loginUserSchema} from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';

const router = Router();
router.post("/register", validateBody(registerUserSchema), ctrlWrapper(registerUserController),);
export default router;
router.post('/login', validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);
router.post('/logout', ctrlWrapper(logoutUserController));