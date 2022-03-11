import express from 'express';
import { body } from 'express-validator';
import { checkIfAdmin } from './../middleware/admin';
import { loginAdmin, markUnsafe } from './../controllers/admin';

const router = express.Router();

router.post('/api/v1/admin/login', loginAdmin);
router.post('/api/v1/admin/mark', body('fileId').isAscii(), checkIfAdmin, markUnsafe);

export { router };