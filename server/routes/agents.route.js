import express from 'express';
import { getAllGeneratedNotes, getLatestGeneratdNotes, makeNotes } from '../controllers/agents.contoller.js';

const router = express.Router();

router.post("/make-topic-notes", makeNotes);
router.get("/get-latest-generated-notes", getLatestGeneratdNotes);
router.get("/get-all-generated-notes", getAllGeneratedNotes);

export default router;