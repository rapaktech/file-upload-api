import express from 'express';
import { body } from 'express-validator';
import { checkIfUser } from './../middleware/user';
import { createPost, getPost } from './../controllers/post';
const router = express.Router();

import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/');
    },
    filename: function (req, file, cb) {
        const fileExtension = file.originalname.split('.')[1];
        const filePath = `${Date.now().toString()}.${fileExtension}`;
        cb(null, filePath);
    }
});

const upload = multer({ storage: storage });

router.post('/api/v1/posts/upload', upload.single('file'), checkIfUser, createPost);
router.post('/api/v1/posts/download', body('fileId').isAscii(), checkIfUser, getPost);

export { router };