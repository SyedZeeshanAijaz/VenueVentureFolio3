import express from 'express'
import { createReview, getReview, updateReview, deleteReview } from '../Controllers/reviewController.js';
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

router.post('/:tourId', createReview)
router.get('/:id',  getReview);
router.put('/:id',  updateReview);
router.delete('/:id',  deleteReview);

export default router