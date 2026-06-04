import express from 'express';
import { changeLikeStatusByLinkId, deleteLinkById, getAllPaginatedLinks, getLinkById, insertLink, updateLink } from '../controllers/links.controller.js';

const router = express.Router();

router.post("/insert-link", insertLink);
router.post("/update-link-by-id", updateLink);
router.get("/get-link-by-id", getLinkById);
router.get("/get-all-paginated-links", getAllPaginatedLinks);
router.delete("/delete-link-by-id", deleteLinkById);
router.post("/change-like-status-by-link-id", changeLikeStatusByLinkId);


export default router;