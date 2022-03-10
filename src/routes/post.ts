import express from 'express';
import { body } from 'express-validator';
import { checkIfUser } from './../middleware/user';
import { createPost, getPost } from './../controllers/post';
import { uploadFile } from './../utilities/multer';
const router = express.Router();

router.post('/api/v1/posts/upload', uploadFile.single('file'), checkIfUser, createPost);
router.post('/api/v1/posts/download', body('fileId').isAscii(), checkIfUser, getPost);

export { router };