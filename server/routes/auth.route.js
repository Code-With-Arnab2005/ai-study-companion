import express from 'express';
import { getCurrentUser, signup, userExistsByEmail } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/user-signup", signup);
router.get("/get-current-user", getCurrentUser);
router.post("/user-exists-by-email", userExistsByEmail);

export default router;