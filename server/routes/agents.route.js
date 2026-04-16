import express from 'express';
import { getAllGeneratedNotes, getGeneratedNotesByFilter, getLatestGeneratdNotes, makeNotes } from '../controllers/agents.contoller.js';

const router = express.Router();

router.post("/make-topic-notes", makeNotes);
router.get("/get-latest-generated-notes", getLatestGeneratdNotes);
router.get("/get-all-generated-notes", getAllGeneratedNotes);
router.get("/get-filtered-generated-documents", getGeneratedNotesByFilter);

export default router;