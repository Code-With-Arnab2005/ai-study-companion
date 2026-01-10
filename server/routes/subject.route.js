import express from 'express';
import { addDocument, deleteDocument, fetchDocumentsBySubjectId, getAllSubjects, getSubjectById, getTagsBySubjectId, insertSubject } from '../controllers/subject.controller.js';

const router = express.Router();

router.post("/add-subject", insertSubject);
router.get("/get-all-subject", getAllSubjects);
router.post("/add-document", addDocument);
router.post("/get-subject-by-id", getSubjectById);
router.post("/fetch-documents-by-subject-id", fetchDocumentsBySubjectId);
router.post("/get-tags-by-subject-id", getTagsBySubjectId);
router.delete("/delete-document-by-id", deleteDocument);

export default router;