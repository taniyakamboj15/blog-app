import express from 'express';
import { registerUser, loginUser, logoutUser, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import validateResource from '../middleware/validateResource';
import { registerSchema, loginSchema } from '../schemas/authSchemas';

const router = express.Router();

router.post('/register', validateResource(registerSchema), registerUser);
router.post('/login', validateResource(loginSchema), loginUser);
router.post('/logout', logoutUser);
router.get('/me', protect, getMe);

export default router;
