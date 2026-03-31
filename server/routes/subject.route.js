import express from 'express';
import {
    addDocument,
    deleteDocument,
    deleteSubject,
    fetchDocumentsBySubjectId,
    getAllDocsFilteredByTypes,
    getAllSubjects,
    getDailyHeatmapData,
    getNoOfSubjectsForLastSevenDays,
    getNumberOfDocuments,
    getNumberOfPdfNotes,
    getNumberOfSubjects,
    getRecentCreatedDocuments,
    getRecentCreatedSubjects,
    getSubjectById,
    getTagsBySubjectId,
    insertSubject
} from '../controllers/subject.controller.js';

const router = express.Router();

router.post("/add-subject", insertSubject);
router.delete("/delete-subject", deleteSubject);
router.get("/get-all-subject", getAllSubjects);
router.post("/add-document", addDocument);
router.post("/get-subject-by-id", getSubjectById);
router.post("/fetch-documents-by-subject-id", fetchDocumentsBySubjectId);
router.post("/get-tags-by-subject-id", getTagsBySubjectId);
router.delete("/delete-document-by-id", deleteDocument);
router.get("/get-count-of-documents", getNumberOfDocuments);
router.get("/get-count-of-subjects", getNumberOfSubjects);
router.get("/get-count-of-pdf-docs", getNumberOfPdfNotes);
router.get("/get-recent-subjects", getRecentCreatedSubjects);
router.get("/get-recent-documents", getRecentCreatedDocuments);
router.get("/get-last-seven-days-subject-filtered-by-date", getNoOfSubjectsForLastSevenDays);
router.get("/get-documents-by-filtered-types", getAllDocsFilteredByTypes);
router.get("/get-daily-heatmap-data", getDailyHeatmapData);

export default router;