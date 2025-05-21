import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Product from '../models/Product';
import Review from '../models/Review';

// @desc    Get all reviews for a product
// @route   GET /api/products/:id/reviews
// @access  Public
export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.productId;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        const reviews = await Review.find({ productId }).sort({ date: -1 });

        res.json(reviews);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// @desc    Add a review to a product
// @route   POST /api/products/:id/reviews
// @access  Public
export const addProductReview = async (req: Request, res: Response): Promise<void> => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const productId = req.params.productId;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        // Create new review
        const { author, rating, comment } = req.body;
        const review = new Review({
            productId,
            author,
            rating: Number(rating),
            comment,
            date: new Date()
        });

        await review.save();

        // Update product's average rating
        await updateProductAverageRating(productId);

        res.status(201).json(review);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// @desc    Update a review
// @route   PUT /api/products/:productId/reviews/:id
// @access  Public
export const updateReview = async (req: Request, res: Response): Promise<void> => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    try {
        const { productId, id } = req.params;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        // Check if review exists and belongs to the product
        const review = await Review.findOne({
            _id: id,
            productId
        });

        if (!review) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }

        // Update review
        const { author, rating, comment } = req.body;

        if (author) review.author = author;
        if (rating) review.rating = Number(rating);
        if (comment) review.comment = comment;

        await review.save();

        // Update product's average rating
        await updateProductAverageRating(productId);

        res.json(review);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// @desc    Delete a review
// @route   DELETE /api/products/:productId/reviews/:id
// @access  Public
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, id } = req.params;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        // Check if review exists and belongs to the product
        const review = await Review.findOne({
            _id: id,
            productId
        });

        if (!review) {
            res.status(404).json({ message: 'Review not found' });
            return;
        }

        await review.deleteOne();

        // Update product's average rating
        await updateProductAverageRating(productId);

        res.json({ message: 'Review removed' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

// Helper function to update product's average rating
const updateProductAverageRating = async (productId: string): Promise<void> => {
    const reviews = await Review.find({ productId });

    if (reviews.length === 0) {
        await Product.findByIdAndUpdate(productId, { averageRating: 0 });
        return;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    await Product.findByIdAndUpdate(productId, {
        averageRating: Math.round(averageRating * 10) / 10
    });
}; 