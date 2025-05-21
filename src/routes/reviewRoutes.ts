import express from 'express';
import {
    getProductReviews,
    addProductReview,
    updateReview,
    deleteReview
} from '../controllers/reviewController';
import { validateReview } from '../middlewares/validationMiddleware';

const router = express.Router({ mergeParams: true });

// @route   GET /api/products/:id/reviews
// @desc    Get all reviews for a product
router.get('/', getProductReviews);

// @route   POST /api/products/:id/reviews
// @desc    Add a review to a product
router.post('/', validateReview, addProductReview);

// @route   PUT /api/products/:productId/reviews/:id
// @desc    Update a review
router.put('/:id', validateReview, updateReview);

// @route   DELETE /api/products/:productId/reviews/:id
// @desc    Delete a review
router.delete('/:id', deleteReview);

export default router;