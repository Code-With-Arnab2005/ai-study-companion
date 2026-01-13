import express from 'express';
import { makeNotes } from '../controllers/agents.contoller.js';

const router = express.Router();

router.post("/make-topic-notes", makeNotes);

export default router;