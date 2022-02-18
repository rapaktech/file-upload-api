import express from 'express';
import { body } from 'express-validator';
import { checkIfUser } from './../middleware/user';
import { createFolder } from './../controllers/folder';
const router = express.Router();

router.post('/api/v1/folders/create', body('name').isAscii(), checkIfUser, createFolder);

export { router };