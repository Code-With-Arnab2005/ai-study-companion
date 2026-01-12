import express from 'express';
import { getCurrentUser, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/user-signup", signup);
router.get("/get-current-user", getCurrentUser);

export default router;