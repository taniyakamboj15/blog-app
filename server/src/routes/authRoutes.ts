import express from 'express';
import { registerUser, loginUser, logoutUser, getMe, updateUserProfile, getAllUsers, deleteUser } from '../controllers/authController';
import { protect, authorize } from '../middleware/authMiddleware';
import validateResource from '../middleware/validateResource';
import { registerSchema, loginSchema } from '../schemas/authSchemas';

const router = express.Router();

router.post('/register', validateResource(registerSchema), registerUser);
router.post('/login', validateResource(loginSchema), loginUser);
router.post('/logout', logoutUser);
router.route('/profile')
    .get(protect, getMe)
    .put(protect, updateUserProfile);

router.route('/users')
    .get(protect, authorize('admin'), getAllUsers);

router.route('/users/:id')
    .delete(protect, authorize('admin'), deleteUser);

export default router;
