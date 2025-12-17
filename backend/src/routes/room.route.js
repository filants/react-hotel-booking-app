import express from 'express';
import { create, fetch } from '../controllers/index.js';

const router = express.Router();

router.post('/create', create);
router.get('/', fetch);

export default router;
