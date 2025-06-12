import express from 'express';
import { createActivity, getActivitiesByUser } from '../controllers/activityController.js';

const router = express.Router();

router.post('/', createActivity);
router.get('/:userId', getActivitiesByUser);

export default router;
