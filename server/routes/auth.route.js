import express from 'express';
import { getCurrentUser, signup, userExistsByEmail, forgotPassword } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/user-signup", signup);
router.get("/get-current-user", getCurrentUser);
router.post("/user-exists-by-email", userExistsByEmail);
router.post("/forgot-password", forgotPassword);

export default router;