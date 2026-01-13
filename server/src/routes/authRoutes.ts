import express from 'express';
import { registerUser, loginUser, logoutUser, getMe, updateUserProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';
import validateResource from '../middleware/validateResource';
import { registerSchema, loginSchema } from '../schemas/authSchemas';

const router = express.Router();

router.post('/register', validateResource(registerSchema), registerUser);
router.post('/login', validateResource(loginSchema), loginUser);
router.post('/logout', logoutUser);
router.route('/profile')
    .get(protect, getMe)
    .put(protect, updateUserProfile);

export default router;
