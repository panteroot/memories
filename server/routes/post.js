import express from "express";
import {
    getPosts,
    getPostsBySearch,
    getPost,
    createPost,
    deletePost,
    updatePost,
    likePost,
} from "../controllers/postController.js";

import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);

router.post('/', requireAuth, createPost);

router.use(requireAuth);
router.delete('/:id', deletePost);
router.patch('/:id', updatePost);
router.patch('/likepost/:id', likePost);

export default router;