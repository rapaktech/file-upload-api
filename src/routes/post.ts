import express from 'express';
import { body } from 'express-validator';
import { checkIfUser } from './../middleware/user';
import { createPost, getPost, upload } from './../controllers/post';
const router = express.Router();

router.post('/api/v1/posts/upload', upload, body('title').isAscii(), checkIfUser, createPost);
router.post('/api/v1/posts/download', body('fileId').isAscii(), checkIfUser, getPost);

export { router };